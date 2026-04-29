package middlewares

import (
	"fmt"
	"os"
	"time"

	"github.com/A9RYA6N/Calhi/backend/api/db"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func getUserFromToken(tokenString string) (*db.User, error) {
	secret:=os.Getenv("JWT_SECRET")

	token, err:=jwt.Parse(tokenString, func(token *jwt.Token) (any, error){
		if _, ok:=token.Method.(*jwt.SigningMethodHMAC); !ok{
			return nil, fmt.Errorf("invalid signing method")
		}
		return []byte(secret), nil
	})

	if err!=nil || !token.Valid{
		return nil, fmt.Errorf("invalid token")
	}

	claims, ok:=token.Claims.(jwt.MapClaims)
	if !ok{
		return nil, fmt.Errorf("invalid claims")
	}

	// expiry check
	if float64(time.Now().Unix())>claims["exp"].(float64){
		return nil, fmt.Errorf("token expired")
	}

	var user db.User
	if err:=db.DB.First(&user, claims["sub"]).Error; err!=nil{
		return nil, fmt.Errorf("user not found")
	}

	return &user, nil
}

func AuthChecker(c *gin.Context){
	tokenString, err:=c.Cookie("Authorization")
	if err!=nil {
		c.AbortWithStatusJSON(401, gin.H{"message": "Unauthorized"})
		return
	}
	user, err:=getUserFromToken(tokenString)
	if err!=nil {
		c.AbortWithStatusJSON(401, gin.H{"message": err.Error()})
		return
	}
	c.Set("user", *user)
	c.Next()
}

func BookingsAuth(c *gin.Context){
	tokenString, err:=c.Cookie("Authorization")
	if err!=nil {
		c.Set("user", nil)
		c.Next()
		return
	}
	user, err:=getUserFromToken(tokenString)
	if err!=nil {
		c.Set("user", nil)
		c.Next()
		return
	}
	c.Set("user", *user)
	c.Next()
}