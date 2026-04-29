package routes

import (
	"github.com/A9RYA6N/Calhi/backend/api/controllers"
	"github.com/A9RYA6N/Calhi/backend/api/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterBookingsRoutes(router *gin.Engine){
	bookingsRoutes:=router.Group("/api/bookings")
	bookingsRoutes.POST("/create", middlewares.BookingsAuth, controllers.CreateBooking)
	bookingsRoutes.GET("/", middlewares.AuthChecker, controllers.GetBookings)
	bookingsRoutes.GET("/verify", controllers.VerifyBooking)
}