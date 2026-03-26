package services

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func SignToken(id uint) (string, error){
	secret:=os.Getenv("JWT_SECRET")
	token:=jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":id,
		"exp":time.Now().Add(time.Hour*24*30).Unix(),
	})
	return token.SignedString([]byte(secret))
}