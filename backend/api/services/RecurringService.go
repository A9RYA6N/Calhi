package services

import (
	"fmt"
	"strings"
	"time"

	"github.com/A9RYA6N/Calhi/backend/api/db"
	"github.com/A9RYA6N/Calhi/backend/structs"
	"gorm.io/gorm"
)

const (
	MaxRecurringDays=60
	MaxRecurringOccurrences=60
)

var dayAbbrevToWeekday=map[string]time.Weekday{
	"SUN":time.Sunday,
	"MON":time.Monday,
	"TUE":time.Tuesday,
	"WED":time.Wednesday,
	"THU":time.Thursday,
	"FRI":time.Friday,
	"SAT":time.Saturday,
}

func MatchesRecurringDay(date time.Time, days []string) bool {
	target:=date.Weekday()
	for _, d:=range days {
		if wd, ok:=dayAbbrevToWeekday[strings.ToUpper(d)]; ok && wd==target {
			return true
		}
	}
	return false
}

func GenerateRecurringDates(startDate, untilDate time.Time, recurringDays []string) ([]time.Time, error) {
	windowDays := int(untilDate.Sub(startDate).Hours()/24) + 1
	if windowDays > MaxRecurringDays {
		return nil, fmt.Errorf("recurring availability cannot exceed %d days", MaxRecurringDays)
	}

	var dates []time.Time
	current := startDate

	for !current.After(untilDate) {
		if MatchesRecurringDay(current, recurringDays) {
			dates = append(dates, current)
			if len(dates) > MaxRecurringOccurrences {
				return nil, fmt.Errorf("recurring availability cannot exceed %d occurrences", MaxRecurringOccurrences)
			}
		}
		current = current.AddDate(0, 0, 1)
	}

	return dates, nil
}

func CheckTimeslotOverlap(tx *gorm.DB, userID uint, newStart, newEnd time.Time) (bool, error) {
	var count int64
	err := tx.Model(&db.Timeslot{}).
		Where(
			"user_id = ? AND NOT (ends_at <= ? OR starts_at >= ?)",
			userID, newStart, newEnd,
		).
		Count(&count).Error

	if err != nil {
		return false, fmt.Errorf("overlap check failed: %w", err)
	}

	return count > 0, nil
}

func GetBaseSlug(slug string) string {
	parts := strings.Split(slug, "-")
	if len(parts) < 2 {
		return slug
	}
	last := parts[len(parts)-1]
	for _, ch := range last {
		if ch < '0' || ch > '9' {
			return slug
		}
	}
	if last == "" {
		return slug
	}
	return strings.Join(parts[:len(parts)-1], "-")
}

func GenerateUniqueSlug(base string, userId uint) string {
	slug := base
	counter := 1
	for {
		var count int64
		db.DB.Model(&db.Timeslot{}).Where("slug=? AND user_id=?", slug, userId).Count(&count)
		if count == 0 {
			break
		}
		slug = fmt.Sprintf("%s-%d", base, counter)
		counter++
	}
	return slug
}

func CreateRecurringTimeslots(
	req structs.CreateTimeslotRequest,
	user db.User,
	utcStart, utcEnd time.Time,
	baseSlug string,
) (int, int, error) {
	if len(req.RecurringDays) == 0 {
		return 0, 400, fmt.Errorf("recurringdays is required when isrecurring is true")
	}
	if req.Until == "" {
		return 0, 400, fmt.Errorf("until is required when isrecurring is true")
	}

	loc, err := time.LoadLocation(req.Timezone)
	if err != nil {
		return 0, 400, fmt.Errorf("invalid timezone: %v", err)
	}

	untilDate, err := time.ParseInLocation("2006-01-02", req.Until, loc)
	if err != nil {
		return 0, 400, fmt.Errorf("until must be a date in YYYY-MM-DD format")
	}

	startDate, err := time.ParseInLocation("2006-01-02T15:04:05", req.StartsAt, loc)
	if err != nil {
		return 0, 400, fmt.Errorf("invalid startsat: %v", err)
	}

	startDay := time.Date(startDate.Year(), startDate.Month(), startDate.Day(), 0, 0, 0, 0, loc)
	untilDay := time.Date(untilDate.Year(), untilDate.Month(), untilDate.Day(), 0, 0, 0, 0, loc)

	dates, err := GenerateRecurringDates(startDay, untilDay, req.RecurringDays)
	if err != nil {
		return 0, 400, err
	}
	if len(dates) == 0 {
		return 0, 400, fmt.Errorf("no occurrences found for the given days and date range")
	}

	startHour, startMin, startSec := utcStart.Clock()
	endHour, endMin, endSec := utcEnd.Clock()

	seriesBaseSlug := GenerateUniqueSlug(baseSlug, user.ID)

	tx := db.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	for i, date := range dates {
		occurrenceStart := time.Date(date.Year(), date.Month(), date.Day(),
			startHour, startMin, startSec, 0, time.UTC)
		occurrenceEnd := time.Date(date.Year(), date.Month(), date.Day(),
			endHour, endMin, endSec, 0, time.UTC)

		overlaps, err := CheckTimeslotOverlap(tx, user.ID, occurrenceStart, occurrenceEnd)
		if err != nil {
			tx.Rollback()
			return 0, 500, err
		}
		if overlaps {
			tx.Rollback()
			return 0, 409, fmt.Errorf("timeslot overlaps with an existing slot on %s", date.Format("2006-01-02"))
		}

		occurrenceSlug := seriesBaseSlug
		if i > 0 {
			occurrenceSlug = fmt.Sprintf("%s-%d", seriesBaseSlug, i)
		}

		timeslot := db.Timeslot{
			UserID:    user.ID,
			StartsAt:  occurrenceStart,
			EndsAt:    occurrenceEnd,
			Timezone:  req.Timezone,
			Duration:  req.Duration,
			Slug:      occurrenceSlug,
			EventName: req.EventName,
		}

		if err := tx.Create(&timeslot).Error; err != nil {
			tx.Rollback()
			return 0, 500, fmt.Errorf("Failed to create timeslot for %s: %v", date.Format("2006-01-02"), err)
		}
	}

	if err := tx.Commit().Error; err != nil {
		return 0, 500, fmt.Errorf("Failed to commit recurring timeslots: %v", err)
	}

	return len(dates), 201, nil
}
