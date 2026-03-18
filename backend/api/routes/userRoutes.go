package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/A9RYA6N/Calhi/backend/api/controllers"
)

func RouterCreator() *gin.Engine{
	router := gin.Default()
	router.POST("/user/login", controllers.LoginUser)
	router.POST("/user/register", controllers.RegisterUser)
	return router
}