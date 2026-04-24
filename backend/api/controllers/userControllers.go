package controllers

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/A9RYA6N/Calhi/backend/api/db"
	"github.com/A9RYA6N/Calhi/backend/api/services"
	"github.com/A9RYA6N/Calhi/backend/structs"
	"github.com/gin-gonic/gin"
)

func setAuthCookie(c *gin.Context, token string) {
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", token, 3600*24*30, "", "", false, true)
}

func isDuplicateError(err error) bool {
	return strings.Contains(err.Error(), "duplicate key")
}

func LoginUser(c *gin.Context){
	var req structs.LoginRequest
	//Bind the request to the struct as a JSON
	if c.ShouldBindJSON(&req)!=nil{
		c.JSON(400, gin.H{
			"success": false,
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
			"success": false,
			"message": "Invalid email",
		})
		return
	}
	//Check password match
	match := services.CheckPasswordHash(password, user.Password)
	fmt.Println(match)
	if !match{
		c.JSON(401, gin.H{
			"success": false,
			"message": "Invalid password",
		})
		return
	}
	//Create token
	token, err:=services.SignToken(user.ID)
	if err!=nil{
		c.JSON(500, gin.H{
			"success": false,
			"message": "Error logging in",
		})
		return
	}
	//Set cookie
	setAuthCookie(c, token)
	c.JSON(200, gin.H{
		"success": true,
		"message": "Logged In",
		"token":   token,
	})
}

func RegisterUser(c *gin.Context){
	var req structs.RegisterRequest
	if c.ShouldBindJSON(&req) !=nil{
		c.JSON(400, gin.H{
			"success": false,
			"message": "Invalid request body",
		})
		return
	}

	if req.Email == "" || req.Password == "" || req.UserName == "" {
		c.JSON(400, gin.H{"success": false, "message": "Missing required fields"})
		return
	}

	hash, _ := services.HashPassword(req.Password)

	user:=db.User{
		Email: req.Email,
		Name: req.Name,
		Password: hash,
		UserName: req.UserName,
	}
	result:=db.DB.Create(&user)

	if result.Error != nil {
		if isDuplicateError(result.Error) {
			c.JSON(400, gin.H{
				"success": false,
				"message": "Email or username already exists",
			})
			return
		}

		c.JSON(500, gin.H{"success": false, "message": "Failed to create user"})
		return
	}	

	token, err:=services.SignToken(user.ID)
	if err!=nil{
		c.JSON(500, gin.H{
			"success": false,
			"message": "Error signing up",
		})
		return
	}
	setAuthCookie(c, token)
	c.JSON(201, gin.H{
		"success": true,
		"message": "User registered successfully",
		"token": token,
	})
}

func Logout(c *gin.Context){
	c.SetCookie("Authorization", "delete", -1, "", "", false, true)
	c.JSON(200, gin.H{
		"success":true,
		"message":"Logged out",
	})
}

func GetUser(c *gin.Context){
	user, _:=c.Get("user")
	c.JSON(200, gin.H{
		"success":true,
		"message":"Got user",
		"data":user,
	})
}

func TestAuth(c *gin.Context){
	user, _:=c.Get("user")
	c.JSON(200, gin.H{
		"success":true,
		"message":"Logged ins",
		"data":user,
	})
}

func TestMail(c *gin.Context){
	services.SendMail(c, "aryanburnwal8@gmail.com")
}