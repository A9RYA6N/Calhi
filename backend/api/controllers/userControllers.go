package controllers

import (
	"fmt"
	"net/http"

	"github.com/A9RYA6N/Calhi/backend/api/db"
	"github.com/A9RYA6N/Calhi/backend/api/services"
	"github.com/A9RYA6N/Calhi/backend/structs"
	"github.com/gin-gonic/gin"
)

func LoginUser(c *gin.Context){
	var req structs.LoginRequest
	if c.ShouldBindJSON(&req)!=nil{
		c.JSON(400, gin.H{
			"message": "Invalid request body",
		})
		return
	}
	email := req.Email
	password := req.Password
	
	var user db.User
	// Find user by email
	result := db.DB.Where("email = ?", email).First(&user)
	if result.Error != nil {
		c.JSON(401, gin.H{
			"message": "Invalid email",
		})
		return
	}
	match := services.CheckPasswordHash(password, user.Password)
	fmt.Println(match)
	if match!=true{
		c.JSON(401, gin.H{
			"message": "Invalid password",
		})
		return
	}
	token, err:=services.SignToken(user.ID)
	if err!=nil{
		c.JSON(500, gin.H{
			"message": "Error logging in",
		})
		return
	}
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", token, 3600*24*30, "", "", false, true)
	c.JSON(200, gin.H{
		"message": "Logged In",
		"token":   token,
	})
}

func RegisterUser(c *gin.Context){
	var req structs.RegisterRequest
	if c.ShouldBindJSON(&req) !=nil{
		c.JSON(400, gin.H{
			"message": "Invalid request body",
		})
		return
	}

	var userExist db.User

	checkIfPresent := db.DB.Where("email = ?", req.Email).First(&userExist)
	if checkIfPresent.Error == nil {
		c.JSON(401, gin.H{
			"message": "Email already registered",
		})
		return
	}

	hash, _ := services.HashPassword(req.Password)

	user:=db.User{
		Email:req.Email,
		Name:req.Name,
		Password:hash,
	}
	result:=db.DB.Create(&user)

	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": "Failed to create user",
		})
		return
	}

	token, err:=services.SignToken(user.ID)
	if err!=nil{
		c.JSON(500, gin.H{
			"message": "Error signing up",
		})
		return
	}

	c.JSON(201, gin.H{
		"message": "User registered successfully",
		"token": token,
	})
}

func Logout(c *gin.Context){
	c.SetCookie("Authorization", "delete", -1, "", "", false, true)
	c.JSON(200, gin.H{
		"message":"Logged out",
	})
}

func TestAuth(c *gin.Context){
	user, _:=c.Get("user")
	c.JSON(200, gin.H{
		"message":"Logged in",
		"user":user,
	})
}