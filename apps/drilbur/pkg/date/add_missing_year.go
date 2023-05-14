package date

import (
	"time"
)

var prevDate time.Time = time.Now()

// Adds missing year based on occurance by starting with the current date
// This should be called in an array of sorted day-month pairs.
//
// # Examples
//
// 23.05 => 23.05.2023
//
// 10.02 => 10.07.2023
//
// 04.04 => 04.04.2022
func AddMissingYear(dateString string, format Format) time.Time {
	// convert to time.Time based on format
	dateByFormat, _ := GetByFormat(dateString, format)
	newYear := prevDate.Year()

	if dateByFormat.Month() > prevDate.Month() {
		newYear = prevDate.Year() - 1
	}

	date := time.Date(
		newYear,
		dateByFormat.Month(),
		dateByFormat.Day(),
		0, 0, 0, 0,
		time.Local,
	)
	prevDate = date
	return date
}
