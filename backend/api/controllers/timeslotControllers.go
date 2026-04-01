package controllers

import (
	"fmt"

	"github.com/A9RYA6N/Calhi/backend/api/db"
	"github.com/A9RYA6N/Calhi/backend/structs"
	"github.com/gin-gonic/gin"
)

func CreateTimeslot(c *gin.Context){
	var req structs.CreateRequest
	if c.ShouldBindJSON(&req)!=nil{
		c.JSON(400, gin.H{
			"message": "Invalid request body",
		})
		return
	}

	user, _:=c.Get("user")

	timeslot:=db.Timeslot{
		UserId: user.(db.User).ID,
		Start: req.Start,
		End: req.End,
	}
	result:=db.DB.Create(&timeslot)
	fmt.Println(result.Error)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": "Failed to create timeslot",
			"error":result.Error,
		})
		return
	}
	c.JSON(201, gin.H{
		"message":"Timeslot created",
	})
}

func GetTimeslot(c *gin.Context){
	user, _:=c.Get("user")

	var timeslots []db.Timeslot

	result:=db.DB.Where("user_id = ?", user.(db.User).ID).Find(&timeslots)
	if result.Error != nil {
		c.JSON(401, gin.H{
			"message": "Invalid request",
			"error":result.Error,
		})
		return
	}

	c.JSON(200, gin.H{
		"message":"Got timeslots",
		"timeslots": timeslots,
	})
}