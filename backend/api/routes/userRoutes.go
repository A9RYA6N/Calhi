package routes

import (
	"github.com/A9RYA6N/Calhi/backend/api/controllers"
	"github.com/A9RYA6N/Calhi/backend/api/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterUserRoutes(router *gin.Engine){
	userRoutes:=router.Group("/api/user")
	userRoutes.POST("/login", controllers.LoginUser)
	userRoutes.POST("/register", controllers.RegisterUser)
	userRoutes.GET("/testauth", middlewares.AuthChecker, controllers.TestAuth)
	userRoutes.GET("/logout", controllers.Logout)
	userRoutes.GET("/", middlewares.AuthChecker, controllers.GetUser)
}