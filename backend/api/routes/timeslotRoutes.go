package routes

import (
	"github.com/A9RYA6N/Calhi/backend/api/controllers"
	"github.com/A9RYA6N/Calhi/backend/api/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterTimeslotRoutes(router *gin.Engine){
	timeslotRoutes:=router.Group("/api/timeslot", middlewares.AuthChecker)
	timeslotRoutes.POST("/create", controllers.CreateTimeslot)
	timeslotRoutes.GET("/", controllers.GetTimeslots)

	router.GET("/api/timeslot/:username", controllers.GetUserTimeslots)
	router.GET("/api/timeslot/:username/:slug", controllers.GetTimeslotBySlug)
}