package date

import (
	"errors"
	"time"
)

// Checks if provided timestamp (in RFC3339) passed a duration compared to the current time.

// Returns true (valid) if the duration hasn't been passed yet.
func IsTimestampValid(timestamp string, duration time.Duration) (bool, error) {
	// create time based on timestamp
	timeByTimestamp, err := time.Parse(time.RFC3339, timestamp)
	if err != nil {
		return false, errors.New("Unable to parse timestamp: " + timestamp)
	}

	// is the current time before the time the timestamp is invalid
	return time.Now().Before(timeByTimestamp.Add(duration)), nil
}
