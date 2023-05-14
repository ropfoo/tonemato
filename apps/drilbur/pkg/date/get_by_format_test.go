package date

import (
	"testing"
	"time"
)

func TestGetByFormat(t *testing.T) {
	type TestDate struct {
		GotDate     string
		WantDate    string
		ShouldMatch bool
		Format      Format
	}

	testData := []TestDate{
		{GotDate: "23.123.132.3123.", WantDate: "2023-01-01T00:00:00+01:00", ShouldMatch: true, Format: DMYDot},
		{GotDate: "10.05.2023", WantDate: "2023-05-10T00:00:00+02:00", ShouldMatch: true, Format: DMYDot},
		{GotDate: "10.05.", WantDate: "2023-05-10T00:00:00+02:00", ShouldMatch: true, Format: DMYDot},
		{GotDate: "10.02.2023", WantDate: "2023-05-10T00:00:00+02:00", ShouldMatch: false, Format: DMYDot},
		{GotDate: "..2023", WantDate: "2023-01-01T00:00:00+01:00", ShouldMatch: true, Format: DMYDot},
		{GotDate: "...", WantDate: "2023-01-01T00:00:00+01:00", ShouldMatch: true, Format: DMYDot},
		{GotDate: "..", WantDate: "2023-01-01T00:00:00+01:00", ShouldMatch: true, Format: DMYDot},
		{GotDate: "", WantDate: "2023-01-01T00:00:00+01:00", ShouldMatch: true, Format: DMYDot},
	}

	for _, data := range testData {
		gotDate, _ := GetByFormat(data.GotDate, data.Format)
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
