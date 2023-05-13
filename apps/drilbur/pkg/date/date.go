package date

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"
)

type Format string

const (
	Unknown Format = ""
	DMYDot  Format = "dd.mm.yyyy"
)

// returns time.Time based on the "german" date format (eg. "12.05.2023")
func GetByFormat(dateString string, format Format) (time.Time, error) {

	var fallbackDate time.Time = time.Date(2023, 1, 1, 0, 0, 0, 0, time.Local)

	if format == DMYDot {
		dateValues := strings.Split(dateString, ".")

		if len(dateValues) != 3 {
			errorMessage := fmt.Sprintf("wrong date format - expected: %q but got: %q", DMYDot, format)
			return fallbackDate, errors.New(errorMessage)
		}

		day, error := strconv.Atoi(dateValues[0])
		if error != nil {
			day = 1
		}

		month, error := strconv.Atoi(dateValues[1])
		if error != nil {
			month = 1
		}

		year, error := strconv.Atoi(dateValues[2])
		if error != nil {
			year = 2023
		}

		return time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.Local), nil
	}

	panic(("Wrong format"))

	// return fallbackDate, nil

}
