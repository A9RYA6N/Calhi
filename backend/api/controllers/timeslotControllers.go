package controllers

import (
	"strings"

	"github.com/A9RYA6N/Calhi/backend/api/db"
	"github.com/A9RYA6N/Calhi/backend/api/services"
	"github.com/A9RYA6N/Calhi/backend/structs"
	"github.com/gin-gonic/gin"
)

func makeSlug(s string) string {
	s=strings.ToLower(s)
	s=strings.ReplaceAll(s, " ", "-")
	return s
}

func CreateTimeslot(c *gin.Context){
	var req structs.CreateTimeslotRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	utcStart, utcEnd, err := services.ConvertToUTC(req.StartsAt, req.EndsAt, req.Timezone)
	if err != nil {
		c.JSON(400, gin.H{"success": false, "message": err.Error()})
		return
	}

	userVal, exists := c.Get("user")
	if !exists || userVal == nil {
		c.JSON(401, gin.H{"success": false, "message": "Unauthorized"})
		return
	}

	user := userVal.(db.User)
	baseSlug := makeSlug(req.EventName)

	if !req.IsRecurring {
		uniqueSlug := services.GenerateUniqueSlug(baseSlug, user.ID)
		timeslot := db.Timeslot{
			UserID:    user.ID,
			StartsAt:  utcStart,
			EndsAt:    utcEnd,
			Timezone:  req.Timezone,
			Duration:  req.Duration,
			Slug:      uniqueSlug,
			EventName: req.EventName,
		}
		result := db.DB.Create(&timeslot)
		if result.Error != nil {
			c.JSON(500, gin.H{
				"success": false,
				"message": "Failed to create timeslot",
				"error":   result.Error,
			})
			return
		}
		c.JSON(201, gin.H{"success": true, "message": "Timeslot created"})
		return
	}

	count, status, err := services.CreateRecurringTimeslots(req, user, utcStart, utcEnd, baseSlug)
	if err != nil {
		c.JSON(status, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(status, gin.H{
		"success": true,
		"message": "Recurring timeslots created",
		"count":   count,
	})
}

func GetTimeslots(c *gin.Context){
	user, _:=c.Get("user")

	var timeslots []db.Timeslot

	result:=db.DB.Preload("Bookings").Where("user_id = ?", user.(db.User).ID).Find(&timeslots)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"success":false,
			"message": "Invalid request",
			"error": result.Error,
		})
		return
	}

	c.JSON(200, gin.H{
		"success":true,
		"message": "Got timeslots",
		"data": timeslots,
	})
}

func GetUserTimeslots(c *gin.Context){
	uname:=c.Params.ByName("username")

	var user db.User
	var timeslots []db.Timeslot

	userResult:=db.DB.Where("user_name = ?", uname).First(&user)
	if userResult.Error != nil {
		c.JSON(401, gin.H{
			"success":false,
			"message": "User doesnt exist",
			"error": userResult.Error,
		})
		return
	}

	db.DB.Preload("Bookings").Where("user_id = ?", user.ID).Find(&timeslots)

	c.JSON(200, gin.H{
		"success":true,
		"message": "Got timeslots",
		"data": timeslots,
	})
}

func GetTimeslotBySlug(c *gin.Context){
	uname := c.Param("username")
	slug  := c.Param("slug")

	var user db.User
	if err := db.DB.Where("user_name = ?", uname).First(&user).Error; err != nil {
		c.JSON(404, gin.H{"success": false, "message": "User not found"})
		return
	}

	var clicked db.Timeslot
	if err := db.DB.Where("user_id = ? AND slug = ?", user.ID, slug).First(&clicked).Error; err != nil {
		c.JSON(404, gin.H{"success": false, "message": "Timeslot not found"})
		return
	}

	baseSlug := services.GetBaseSlug(clicked.Slug)
	
	var slots []db.Timeslot
	db.DB.
		Preload("Bookings").
		Where("user_id = ?", user.ID).
		Where("slug = ? OR slug LIKE ?", baseSlug, baseSlug+"-%").
		Order("starts_at ASC").
		Find(&slots)

	c.JSON(200, gin.H{
		"success": true,
		"message": "Got timeslot series",
		"data":    slots,
	})
}