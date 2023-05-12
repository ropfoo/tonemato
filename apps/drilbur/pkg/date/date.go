package date

import (
	"errors"
	"strconv"
	"strings"
	"time"
)

// returns time.Time based on the "german" date format (eg. "12.05.2023")
func GetByGermanFormat(dateString string) (time.Time, error) {
	dateValues := strings.Split(dateString, ".")

	if len(dateValues) != 3 {
		return time.Date(2023, 1, 1, 0, 0, 0, 0, time.Local),
			errors.New("wrong date format, returning default date")
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
