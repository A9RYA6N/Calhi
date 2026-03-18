package controllers

import (
	"fmt"
	"github.com/A9RYA6N/Calhi/backend/api/db"
	"github.com/A9RYA6N/Calhi/backend/structs"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func LoginUser(c *gin.Context){
	var req structs.LoginRequest
	if err := c.ShouldBindJSON(&req);err!=nil{
		c.JSON(400, gin.H{
			"error": "Invalid request body",
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
			"error": "Invalid email",
		})
		return
	}
	match := checkPasswordHash(password, user.Password)
	fmt.Println(match)
	if match!=true{
		c.JSON(401, gin.H{
			"error": "Invalid password",
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "Logged In",
		"email":   email,
	})
}

func RegisterUser(c *gin.Context){
	var req structs.RegisterRequest
	if err:=c.ShouldBindJSON(&req); err!=nil{
		c.JSON(400, gin.H{
			"error": "Invalid request body",
		})
		return
	}

	var userExist db.User

	checkIfPresent := db.DB.Where("email = ?", req.Email).First(&userExist)
	if checkIfPresent.Error == nil {
		c.JSON(401, gin.H{
			"error": "Email already registered",
		})
		return
	}

	hash, _ := hashPassword(req.Password)

	user:=db.User{
		Email:req.Email,
		Name:req.Name,
		Password:hash,
	}
	result:=db.DB.Create(&user)

	if result.Error != nil {
		c.JSON(500, gin.H{
			"error": "Failed to create user",
		})
		return
	}

	c.JSON(201, gin.H{
		"message": "User registered successfully",
		"user_id": user.ID,
	})
}

func hashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}

func checkPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}