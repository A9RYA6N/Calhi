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
	UserName string `gorm:"unique; not null"`
}

type Timeslot struct{
	gorm.Model

	UserID uint `gorm:"uniqueIndex:idx_user_slug;not null"`
	EventName string `gorm:"not null"`
	Slug string `gorm:"uniqueIndex:idx_user_slug;not null"`
	Start time.Time `gorm:"not null"`
	End time.Time `gorm:"not null"`
	Duration int `gorm:"not null"`

	Bookings []Booking `gorm:"foreignKey:TimeslotID"`
}

type Booking struct{
	gorm.Model

	TimeslotID uint `gorm:"not null;uniqueIndex:idx_slot_booking"`

	ClientName string `gorm:"not null"`
	ClientEmail string `gorm:"not null"`

	Start time.Time `gorm:"not null;uniqueIndex:idx_slot_booking"`
	End time.Time `gorm:"not null"`

	Status string `gorm:"default:'pending'"`
	Token  string
}