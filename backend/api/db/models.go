package db

import (
	"time"

	"gorm.io/gorm"
)

type User struct{
	gorm.Model //This automatically adds id, created_at, updated_at and deleted_at

	Email string `gorm:"uniqueIndex;not null"`
	Password string `gorm:"not null"  json:"-"`
	Name string `gorm:"not null"`
}

type Timeslot struct{
	gorm.Model

	UserId uint `gorm:"not null"`
	Start time.Time `gorm:"not null"`
	End time.Time `gorm:"not null"`
}