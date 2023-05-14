package date

import (
	"fmt"
	"time"
)

var prevDate time.Time = time.Now()

// Adds missing year based on occurance by starting with the current year
//
// # Examples
//
// 23.05 => 23.05.2023
//
// 10.07 => 10.07.2023
//
// 04.04 => 04.04.2022
func AddMissingYear(dateString string, format Format, startYear int) time.Time {

	// convert to time.Time based on format
	dateByFormat, _ := GetByFormat(dateString, format)

	// prevDate = time.Date(startYear, 1, dateByFormat.Day(), 0, 0, 0, 0, time.Local)
	newYear := prevDate.Year()

	fmt.Println(dateByFormat.Month(), prevDate.Month())
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
