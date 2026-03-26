package middlewares

import (
	"fmt"
	"os"
	"time"

	"github.com/A9RYA6N/Calhi/backend/api/db"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthChecker(c *gin.Context){
	secret:=os.Getenv("JWT_SECRET")
	tokenString, err:=c.Cookie("Authorization")

	if err!=nil{
		c.AbortWithStatusJSON(401,gin.H{
			"message":"Unauthorized request",
		})
		return
	}

	token, err:=jwt.Parse(tokenString, func(token *jwt.Token) (any , error){
		if _,ok:=token.Method.(*jwt.SigningMethodHMAC); !ok{
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header)
		}
		return []byte(secret), nil
	})

	if claims, ok:=token.Claims.(jwt.MapClaims); ok && token.Valid{

		if float64(time.Now().Unix()) > claims["exp"].(float64){
			c.AbortWithStatusJSON(401, gin.H{
				"message":"Invalid access", 
			})
		}

		var user db.User
		db.DB.First(&user, claims["sub"])

		if user.ID==0{
			c.AbortWithStatusJSON(401, gin.H{
				"message":"Invalid access", 
			})
		}

		c.Set("user", user)
		fmt.Println(user)
		fmt.Println(claims["foo"], claims["nbf"])		

		c.Next()
	}else{
		fmt.Println(err)
		c.AbortWithStatusJSON(401, gin.H{
			"message":"Invalid access", 
		})
	}
}