package main

import (
	"github.com/A9RYA6N/Calhi/backend/api/db"
	"github.com/A9RYA6N/Calhi/backend/api/middlewares"
	"github.com/A9RYA6N/Calhi/backend/api/routes"
	"github.com/A9RYA6N/Calhi/backend/api/services"
	"github.com/gin-gonic/gin"
)

func init(){
  services.LoadEnvVariables()
  db.ConnectDB()
}

func main() {
  // db.Migrate()
  router := gin.Default()
	router.Use(middlewares.CORSMiddleware())
  routes.RegisterUserRoutes(router)
  routes.RegisterTimeslotRoutes(router)
  router.GET("/", func(c *gin.Context) {
    c.JSON(200, gin.H{
      "message":"Hello",
    })
  })
  router.Run()
}