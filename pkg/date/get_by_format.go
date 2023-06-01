package date

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"
)

// Formats a date can have
//
// DMYDot (dd.mm.yyyy) eg. "12.05.2023"
type Format string

const (
	Unknown Format = ""
	DMYDot  Format = "dd.mm.yyyy"
)

// Returns time.Time based on a given date format
func GetByFormat(dateString string, format Format) (time.Time, error) {

	var fallbackDate time.Time = time.Date(2023, 1, 1, 0, 0, 0, 0, time.Local)

	if format == DMYDot {
		dateValues := strings.Split(dateString, ".")

		if len(dateValues) != 3 {
			errorMessage := fmt.Sprintf("wrong date format - expected: %q but got: %q", DMYDot, format)
			return fallbackDate, errors.New(errorMessage)
		}

		day, err := strconv.Atoi(dateValues[0])
		if err != nil {
			day = 1
			fmt.Println("error with day", dateValues[0], err)
		}

		month, err := strconv.Atoi(dateValues[1])
		if err != nil {
			month = 1
			fmt.Println("error with month", dateValues[0], err)
		}

		year, err := strconv.Atoi(dateValues[2])
		if err != nil {
			year = 2023
			fmt.Println("error with year", dateValues[0], err)
		}

		return time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.Local), nil
	}

	return fallbackDate, errors.New("unsupported format")
}
