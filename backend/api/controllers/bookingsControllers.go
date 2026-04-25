package controllers

import(
	"fmt"
	"os"
	"time"

	"github.com/A9RYA6N/Calhi/backend/api/db"
	"github.com/A9RYA6N/Calhi/backend/structs"
	"github.com/A9RYA6N/Calhi/backend/api/services"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func CreateBooking(c *gin.Context){
	var req structs.CreateBookingRequest
	if c.ShouldBindJSON(&req)!=nil{
		c.JSON(400, gin.H{
			"message": "Invalid request body",
		})
		return
	}

	var timeslot db.Timeslot
	result:=db.DB.First(&timeslot, req.TimeslotId)
	if result.Error != nil {
		c.JSON(401, gin.H{
			"message": "Invalid request, invalid timeslotid",
		})
		return
	}

	if req.Start.Before(timeslot.Start) || req.End.After(timeslot.End){
		c.JSON(401, gin.H{
			"message": "Invalid request, time mismatch",
		})
		return
	}

	var existing db.Booking
	db.DB.Where("timeslot_id = ? AND start = ? AND status = ?", req.TimeslotId, req.Start, "confirmed").First(&existing)

	if existing.ID != 0 {
		c.JSON(400, gin.H{
			"message": "Slot already booked",
		})
		return
	}

	token:=uuid.NewString()

	userVal, exists := c.Get("user")
	if exists && userVal != nil {
		booking:=db.Booking{
			TimeslotID: req.TimeslotId,
			ClientName: req.Name,
			ClientEmail: req.Email,
			Start: req.Start,
			End: req.End,
			Status: "confirmed",
			Token: "",
		}
		result:=db.DB.Create(&booking)

		if result.Error != nil {
			c.JSON(500, gin.H{
				"message": "Failed to create booking",
			})
			return
		}
		c.JSON(201, gin.H{
			"success":true,
			"message":"Booking created",
		})
	} else {
		// guest → send verification email
		booking:=db.Booking{
			TimeslotID: req.TimeslotId,
			ClientName: req.Name,
			ClientEmail: req.Email,
			Start: req.Start,
			End: req.End,
			Status: "pending",
			Token: token,
		}
		result:=db.DB.Create(&booking)

		if result.Error != nil {
			c.JSON(500, gin.H{
				"success": false,
				"message": "Failed to create booking",
			})
			return
		}

		verifyURL:=fmt.Sprintf("%s/verify?token=%s", os.Getenv("FRONTEND_URL"), token)

		services.SendMail(c, req.Email, verifyURL)
		c.JSON(200, gin.H{
			"success":true,
			"message":"Mail sent",
		})
		return
	}
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

		if time.Since(booking.CreatedAt) > 5*time.Minute {
			db.DB.Unscoped().Delete(&booking)
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