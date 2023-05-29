package date

import (
	"fmt"
	"testing"
	"time"
)

func TestAddMissingYear(t *testing.T) {

	type TestDate struct {
		GotDate  string
		WantDate string
		Format   Format
	}

	testData := []TestDate{
		{
			GotDate:  "23.05.",
			WantDate: "2023-05-23T00:00:00+02:00",
			Format:   DMYDot,
		},
		{
			GotDate:  "12.03.",
			WantDate: "2023-03-12T00:00:00+01:00",
			Format:   DMYDot,
		},
		{
			GotDate:  "07.08.",
			WantDate: "2022-08-07T00:00:00+02:00",
			Format:   DMYDot,
		},
		{
			GotDate:  "04.02.",
			WantDate: "2022-02-04T00:00:00+01:00",
			Format:   DMYDot,
		},
		{
			GotDate:  "04.05.",
			WantDate: "2021-05-04T00:00:00+02:00",
			Format:   DMYDot,
		},
	}
	var prevDate time.Time = time.Now()
	for _, td := range testData {
		gotDate := AddMissingYear(td.GotDate, &prevDate, td.Format)
		wantDate, _ := time.Parse(time.RFC3339, td.WantDate)
		fmt.Println(prevDate)
		if wantDate.Compare(gotDate) != 0 {
			t.Errorf("got %q, wanted %q", gotDate, wantDate)
		}
	}

}
