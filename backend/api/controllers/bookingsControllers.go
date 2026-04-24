package controllers

import(

	"github.com/A9RYA6N/Calhi/backend/api/db"
	"github.com/A9RYA6N/Calhi/backend/structs"
	"github.com/A9RYA6N/Calhi/backend/api/services"
	"github.com/gin-gonic/gin"
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
	userVal, exists := c.Get("user")
	if exists && userVal != nil {
		booking:=db.Booking{
			TimeslotID: req.TimeslotId,
			ClientName: req.Name,
			ClientEmail: req.Email,
			Start: req.Start,
			End: req.End,
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
		services.SendMail(c, req.Email)
		c.JSON(200, gin.H{
			"success":true,
			"message":"Mail sent",
		})
		return
	}
	// c.JSON(200, gin.H{
	// 	"message":"Booking hit",
	// })
}