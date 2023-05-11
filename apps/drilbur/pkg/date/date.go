package date

import (
	"strconv"
	"strings"
	"time"
)

func GetByGermanFormat(dateString string) time.Time {
	dateValues := strings.Split(dateString, ".")

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
		year = 1
	}

	return time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.Local)
}
