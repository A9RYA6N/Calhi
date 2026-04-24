package structs

import "time"

type CreateBookingRequest struct{
	TimeslotId uint `json:"timeslotid"`
	Email string `json:"email"`
	Name string `json:"name"`
	Start time.Time `json:"start"`
	End time.Time `json:"end"`
}