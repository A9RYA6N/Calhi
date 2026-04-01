package structs

import "time"

type CreateRequest struct{
	Start time.Time `json:"start"`
	End time.Time `json:"end"`
}