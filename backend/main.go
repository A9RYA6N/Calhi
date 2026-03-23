package main

import (
	"os"

	"github.com/A9RYA6N/Calhi/backend/api/db"
	"github.com/A9RYA6N/Calhi/backend/api/middlewares"
	"github.com/A9RYA6N/Calhi/backend/api/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
  godotenv.Load()
  port:=os.Getenv("PORT")
  db.ConnectDB()
  // db.Migrate()
  router := gin.Default()
	router.Use(middlewares.CORSMiddleware())
  routes.RegisterUserRoutes(router)
  router.GET("/", func(c *gin.Context) {
    c.JSON(200, gin.H{
      "message":"Hello",
    })
  })
  router.Run(":"+port)
}