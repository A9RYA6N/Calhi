package controllers

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/A9RYA6N/Calhi/backend/api/db"
	"github.com/A9RYA6N/Calhi/backend/api/services"
	"github.com/A9RYA6N/Calhi/backend/structs"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm/clause"
)

func CreateBooking(c *gin.Context){
	var req structs.CreateBookingRequest
	if c.ShouldBindJSON(&req)!=nil{
		c.JSON(400, gin.H{
			"message": "Invalid request body",
		})
		return
	}

	if req.IdempotencyKey==""{
		c.JSON(400, gin.H{
			"message": "Idempotency key required",
		})
		return
	}

	tx:=db.DB.Begin()
	defer func() {
		if r:=recover(); r!=nil{
			tx.Rollback()
		}
	}()

	var existing db.Booking
	
	err:=tx.Where("idempotency_key = ?", req.IdempotencyKey).First(&existing).Error
	if err==nil{
		tx.Rollback()
		c.JSON(200, gin.H{
			"success": true,
			"message": "Booking already processed",
			"data": existing,
		})
		return
	}

	var timeslot db.Timeslot
	if err:=tx.
		Clauses(clause.Locking{Strength: "UPDATE"}).
		First(&timeslot, req.TimeslotId).Error; err != nil {
		tx.Rollback()
		c.JSON(400, gin.H{"message": "Invalid timeslot"})
		return
	}

	if req.StartsAt.Before(timeslot.StartsAt)||req.EndsAt.After(timeslot.EndsAt){
		tx.Rollback()
		c.JSON(400, gin.H{
			"success":false,
			"message": "Time out of bounds",
		})
		return
	}

	var conflict db.Booking

	err=tx.Where(`timeslot_id = ? AND status = 'confirmed' AND NOT (ends_at <= ? OR starts_at >= ?)`, req.TimeslotId, req.StartsAt, req.EndsAt).First(&conflict).Error

	if err==nil{
		tx.Rollback()
		c.JSON(409, gin.H{
			"success": true,
			"message": "Slot already booked",
		})
		return
	}

	token:=uuid.NewString()
	status:="pending"
	tokenVal:=token
	userVal, exists:=c.Get("user")
	if exists && userVal!=nil{
		status = "confirmed"
		tokenVal = ""
	}

	booking:=db.Booking{
		TimeslotID: req.TimeslotId,
		ClientName: req.Name,
		ClientEmail: req.Email,
		StartsAt: req.StartsAt,
		EndsAt: req.EndsAt,
		Status: status,
		Token: tokenVal,
		IdempotencyKey: req.IdempotencyKey,
	}

	if err:=tx.Create(&booking).Error; err!=nil {
		tx.Rollback()
		if strings.Contains(err.Error(), "duplicate key") {
			c.JSON(409, gin.H{
				"success": false,
				"message": "Slot already booked",
			})
			return
		}

		c.JSON(500, gin.H{
			"success": false,
			"message": "Database error",
		})
		return
	}

	if err := tx.Commit().Error; err!=nil {
		c.JSON(500, gin.H{
			"success": false,
			"message": "Failed to commit transaction",
		})
		return
	}

	if status=="pending"{
		verifyURL:=fmt.Sprintf("%s/verify?token=%s", os.Getenv("FRONTEND_URL"), token)

		go func(email, verifyURL string) {
			err:=services.SendMailWithRetry(email, verifyURL)
			if err!=nil {
				fmt.Println("Mail failed:", err)
			}
		}(req.Email, verifyURL)

		c.JSON(200, gin.H{
			"success": true,
			"message": "Verification mail queued",
		})
		return
	}

	c.JSON(201, gin.H{
		"success": true,
		"message": "Booking created",
		"data": booking,
	})
}

func VerifyBooking(c *gin.Context){
	token:=c.Query("token")
	if token!=""{
		var booking db.Booking

		result:=db.DB.Where("token = ?", token).First(&booking)
		if result.Error!=nil{
			c.JSON(400, gin.H{"message": "Invalid or expired link"})
			return
		}

		if time.Since(booking.CreatedAt)>5*time.Minute {
			db.DB.Delete(&booking)
			c.JSON(400, gin.H{
				"message": "Link expired. Please book again.",
			})
			return
		}

		booking.Status="confirmed"
		booking.Token=""
		db.DB.Save(&booking)
		c.JSON(200, gin.H{
			"success": true,
			"message": "Booking confirmed",
		})
	}else{
		c.JSON(400, gin.H{
			"success": false,
			"message": "Invalid link",
		})
		return
	}
}

func GetBookings(c *gin.Context){
	userVal, exists:=c.Get("user")

	if !exists || userVal==nil {
		c.JSON(401, gin.H{
			"success": false,
			"message": "Unauthorized",
		})
		return
	}
	user:=userVal.(db.User)
	var bookings []db.Booking
	result:=db.DB.Where("client_email = ?", user.Email).Find(&bookings)
	if result.Error!=nil{
		c.JSON(500, gin.H{
			"success": false,
			"message": "DB error",
		})
		return
	}
	c.JSON(200, gin.H{
		"success": true,
		"data": bookings,
	})
}