package teasers

import (
	"time"
	"tonemato/pkg/model"
)

func CreateUnsortedTeasersWithoutYear() []model.ScrapedTeaser {

	var UnortedWithoutYear []model.ScrapedTeaser = []model.ScrapedTeaser{
		{
			Teaser: model.Teaser{
				Date: time.Time{},
			},
			TeaserScrapeMetaInfo: model.TeaserScrapeMetaInfo{
				Meta: struct {
					Page       int    "json:\"page\""
					DateString string "json:\"dateString\""
				}{
					DateString: "",
					Page:       3,
				},
			},
		},
	}
	return UnortedWithoutYear
}
