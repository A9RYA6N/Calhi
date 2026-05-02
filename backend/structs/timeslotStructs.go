package structs

// import "time"

type CreateTimeslotRequest struct{
	EventName string `json:"eventname"`
	StartsAt string `json:"startsat"`
	EndsAt string `json:"endsat"`
	Duration int `json:"duration"`
	Timezone string `json:"timezone"`
}