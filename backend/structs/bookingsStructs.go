package structs

import "time"

type CreateBookingRequest struct{
	TimeslotId uint `json:"timeslotid"`
	Email string `json:"email"`
	Name string `json:"name"`
	StartsAt time.Time `json:"startsat"`
	EndsAt time.Time `json:"endsat"`
	IdempotencyKey string `json:"idempotencykey"`
}