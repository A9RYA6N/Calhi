package services

import (
	"time"
	"fmt"
)

func ConvertToUTC(start string, end string, timezone string) (time.Time, time.Time, error) {
	if timezone==""{
		return time.Time{}, time.Time{}, fmt.Errorf("timezone required")
	}
	loc, err:=time.LoadLocation(timezone)
	if err!=nil{
		return time.Time{}, time.Time{}, err
	}
	layout:="2006-01-02T15:04:05"
	localStart, err:=time.ParseInLocation(layout, start, loc)
	if err!=nil{
		return time.Time{}, time.Time{}, err
	}
	localEnd, err:=time.ParseInLocation(layout, end, loc)
	if err!=nil{
		return time.Time{}, time.Time{}, err
	}
	if !localEnd.After(localStart){
		return time.Time{}, time.Time{}, fmt.Errorf("end must be after start")
	}
	return localStart.UTC(), localEnd.UTC(), nil
}