package structs

import "time"

type CreateTimeslotRequest struct{
	EventName string `json:"eventname"`
	Start time.Time `json:"start"`
	End time.Time `json:"end"`
	Duration int `json:"duration"`
}