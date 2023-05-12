package date

import (
	"testing"
	"time"
)

func TestValidGetByGermanFormat(t *testing.T) {
	type TestDate struct {
		GotDate     string
		WantDate    string
		ShouldMatch bool
	}

	testData := []TestDate{
		{GotDate: "23.123.132.3123.", WantDate: "2023-01-01T00:00:00+01:00", ShouldMatch: true},
		{GotDate: "10.05.2023", WantDate: "2023-05-10T00:00:00+02:00", ShouldMatch: true},
		{GotDate: "10.02.2023", WantDate: "2023-05-10T00:00:00+02:00", ShouldMatch: false},
		{GotDate: ".01.2023", WantDate: "2023-01-01T00:00:00+01:00", ShouldMatch: true},
		{GotDate: "..2023", WantDate: "2023-01-01T00:00:00+01:00", ShouldMatch: true},
		{GotDate: "...", WantDate: "2023-01-01T00:00:00+01:00", ShouldMatch: true},
		{GotDate: "..", WantDate: "2023-01-01T00:00:00+01:00", ShouldMatch: true},
		{GotDate: "", WantDate: "2023-01-01T00:00:00+01:00", ShouldMatch: true},
	}

	for _, data := range testData {
		gotDate, _ := GetByGermanFormat(data.GotDate)
		wantDate, _ := time.Parse(time.RFC3339, data.WantDate)

		switch data.ShouldMatch {
		case true:
			if wantDate.Compare(gotDate) != 0 {
				t.Errorf("got %q, wanted %q", gotDate, wantDate)
			}
		case false:
			if wantDate.Compare(gotDate) == 0 {
				t.Errorf("got %q, wanted %q", gotDate, wantDate)
			}
		}
	}
}
