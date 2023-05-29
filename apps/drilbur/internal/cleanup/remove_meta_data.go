package cleanup

import "tonemato/pkg/model"

func RemoveMetaData(scrapedTeasers []model.ScrapedTeaser) []model.Teaser {
	var teasers []model.Teaser
	for _, scrapedTeaser := range scrapedTeasers {
		scrapedTeaser.Title = "TEst"
		teasers = append(teasers, scrapedTeaser.Teaser)
	}
	return teasers
}
