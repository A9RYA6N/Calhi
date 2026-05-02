package services

import (
	"fmt"
	"os"
	"time"

	"gopkg.in/gomail.v2"
)

func SendMail(email string, verifyUrl string) error{
	senderMail:=os.Getenv("SMTP_MAIL")
	senderPass:=os.Getenv("SMTP_PASSWORD")

	m:=gomail.NewMessage()
	m.SetHeader("From", senderMail)
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Click to confirm your booking")
	m.SetBody("text/plain", verifyUrl)
	// m.AddAlternative("text/html", "<b>Your booking is confirmed!</b>")

	d := gomail.NewDialer(
		"smtp.gmail.com",
		465,
		senderMail,
		senderPass,
	)

	return d.DialAndSend(m)
}

func SendMailWithRetry(email string, verifyURL string) error {

	maxRetries := 3
	for i := range maxRetries {
		err := SendMail(email, verifyURL)
		if err == nil {
			return nil
		}
		time.Sleep(time.Duration(1<<i) * time.Second) // 1s, 2s, 4s
	}
	return fmt.Errorf("failed to send mail after retries")

}