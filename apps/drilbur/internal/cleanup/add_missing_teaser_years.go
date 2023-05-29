package cleanup

import (
	"sort"
	"time"
	"tonemato/pkg/date"
	"tonemato/pkg/model"
)

// type ByPage []model.ScrapedTeaser

// func (teasers ByPage) Len() int           { return len(teasers) }
// func (teasers ByPage) Swap(i, j int)      { teasers[i], teasers[j] = teasers[j], teasers[i] }
// func (teasers ByPage) Less(i, j int) bool { return teasers[i].Meta.Page < teasers[j].Meta.Page }

type ByMonth []model.ScrapedTeaser

func (teasers ByMonth) Len() int      { return len(teasers) }
func (teasers ByMonth) Swap(i, j int) { teasers[i], teasers[j] = teasers[j], teasers[i] }
func (teasers ByMonth) Less(i, j int) bool {
	return teasers[i].Meta.DateString[2:4] < teasers[j].Meta.DateString[2:4]
}

func AddMissingTeaserYears(scrapedTeasers []model.ScrapedTeaser) []model.ScrapedTeaser {
	var sortedTeasers []model.ScrapedTeaser

	sort.Slice(ByMonth(scrapedTeasers), func(i, j int) bool {
		return scrapedTeasers[i].Meta.Page < scrapedTeasers[j].Meta.Page
	})

	var prevDate time.Time = time.Now()
	for _, teaser := range scrapedTeasers {
		teaser.Date = date.AddMissingYear(teaser.Meta.DateString, &prevDate, date.DMYDot)
		sortedTeasers = append(sortedTeasers, teaser)
	}

	return sortedTeasers
}
