package date

import (
	"testing"
	"time"
)

func TestIsTimestampValid(t *testing.T) {
	type TimestampTest struct {
		description   string
		time          time.Time
		duration      time.Duration
		shouldBeValid bool
	}

	timestampTests := []TimestampTest{
		{
			description: "slightly (one minute) before yesterday SHOULD NOT be valid if the duration is 24h",
			// a bit more than yesterday
			time: time.Now().Add(-time.Hour*24 - time.Minute),
			// one day
			duration:      time.Hour * 24,
			shouldBeValid: false,
		},
		{
			description: "yesterday SHOULD be valid if the duration is 2 days",
			// yesterday
			time: time.Now().Add(-time.Hour * 24),
			// two days
			duration:      time.Hour * 24 * 2,
			shouldBeValid: true,
		},
	}

	for _, timestampTest := range timestampTests {
		timestamp := timestampTest.time.Format(time.RFC3339)
		timestampValid, _ := IsTimestampValid(timestamp, timestampTest.duration)
		if timestampValid != timestampTest.shouldBeValid {
			t.Errorf(
				timestampTest.description+" got %t (%q), expected %t (%q)",
				timestampValid,
				timestamp,
				timestampTest.shouldBeValid,
				time.Now().Format(time.RFC3339))
		}
	}
}
