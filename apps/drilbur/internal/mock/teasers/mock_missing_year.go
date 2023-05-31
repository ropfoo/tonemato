package teasers

import (
	"time"
	"tonemato/pkg/model"
)

type MockMissingYearTeaserData struct {
	Date       string
	Page       int
	DateString string
	Order      int
}

func CreateMockTeasersForMissingYearTest(mockData []MockMissingYearTeaserData) []model.ScrapedTeaser {
	var resultTeasers []model.ScrapedTeaser
	for _, mockTeaser := range mockData {
		date, _ := time.Parse(time.RFC3339, mockTeaser.Date)
		resultTeasers = append(resultTeasers,
			model.ScrapedTeaser{
				Teaser: model.Teaser{
					Date: date,
				},
				TeaserScrapeMetaInfo: model.TeaserScrapeMetaInfo{
					Meta: struct {
						Page       int    "json:\"page\""
						DateString string "json:\"dateString\""
						Order      int    "json:\"order\""
					}{
						DateString: mockTeaser.DateString,
						Page:       mockTeaser.Page,
						Order:      mockTeaser.Order,
					},
				},
			},
		)
	}
	return resultTeasers
}
