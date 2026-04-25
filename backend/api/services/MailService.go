package services

import (
	"github.com/gin-gonic/gin"
	"gopkg.in/gomail.v2"
)

func SendMail(c *gin.Context, email string, verifyUrl string){
	m:=gomail.NewMessage()
	m.SetHeader("From", "safetygo73@gmail.com")
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Click to confirm your booking")
	m.SetBody("text/plain", verifyUrl)
	// m.AddAlternative("text/html", "<b>Your booking is confirmed!</b>")

	d := gomail.NewDialer(
		"smtp.gmail.com",
		465,
		"safetygo73@gmail.com",
		"glin ezpg qivf abzg",
	)

	if err := d.DialAndSend(m); err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Email sent successfully!",
	})
}