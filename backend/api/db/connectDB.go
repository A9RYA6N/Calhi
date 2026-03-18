package db

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDB(){
	// Connection string for Neon Postgres
	dsn := os.Getenv("DB_URL")
	// Connect to the database
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info), // Set to Info level for development
	})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	DB = db
	// Get the underlying SQL DB object
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("Failed to get DB object: %v", err)
	}
	// Verify connection
	if err := sqlDB.Ping(); err != nil {
		log.Fatalf("Failed to ping DB: %v", err)
	}
	fmt.Println("Successfully connected to Neon Postgres database!")
}