package controllers

import (
	"fmt"
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

func generateUniqueSlug(base string, userId uint) string {
	slug:=base
	counter:=1
	for{
		var count int64
		db.DB.Model(&db.Timeslot{}).Where("slug=? AND user_id=?", slug, userId).Count(&count)
		if count==0{
			break
		}
		slug=fmt.Sprintf("%s-%d", base, counter)
		counter++
	}
	return slug
}

func CreateTimeslot(c *gin.Context){
	var req structs.CreateTimeslotRequest
	err1:=c.ShouldBindJSON(&req)
	if err1!=nil{
		c.JSON(400, gin.H{
			"success":false,
			"message": "Invalid request body",
			"error": err1.Error(),
		})
		return
	}

	utcStart, utcEnd, err:=services.ConvertToUTC(req.StartsAt, req.EndsAt, req.Timezone)

	if err!=nil{
		c.JSON(400, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	userVal, exists:=c.Get("user")
	if !exists||userVal==nil{
		c.JSON(401, gin.H{
			"success": false,
			"message": "Unauthorized",
		})
		return
	}
	//(db.User) sets the user var as a User model from db
	user:=userVal.(db.User)

	baseSlug:=makeSlug(req.EventName)
	uniqueSlug:=generateUniqueSlug(baseSlug, user.ID)

	timeslot:=db.Timeslot{
		UserID: user.ID,
		StartsAt: utcStart,
		EndsAt: utcEnd,
		Timezone: req.Timezone,
		Duration: req.Duration,
		Slug: uniqueSlug,
		EventName: req.EventName,
	}

	result:=db.DB.Create(&timeslot)
	// fmt.Println(result.Error)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"success":false,
			"message": "Failed to create timeslot",
			"error":result.Error,
		})
		return
	}
	c.JSON(201, gin.H{
		"success":true,
		"message":"Timeslot created",
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