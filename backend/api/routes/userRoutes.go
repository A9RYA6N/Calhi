package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/A9RYA6N/Calhi/backend/api/controllers"
)

func RegisterUserRoutes(router *gin.Engine){
	userRoutes:=router.Group("/api/user")
	userRoutes.POST("/login", controllers.LoginUser)
	userRoutes.POST("/register", controllers.RegisterUser)
}