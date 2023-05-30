package cleanup

import (
	"sort"
	"time"
	"tonemato/pkg/date"
	"tonemato/pkg/helper"
	"tonemato/pkg/model"
)

func AddMissingTeaserYears(scrapedTeasers []model.ScrapedTeaser) []model.ScrapedTeaser {
	var sortedTeasers []model.ScrapedTeaser
	var pagedTeasers map[int][]model.ScrapedTeaser = map[int][]model.ScrapedTeaser{}

	// group teasers in their corresponding pages
	for _, teaser := range scrapedTeasers {
		pagedTeasers[teaser.Meta.Page] = append(pagedTeasers[teaser.Meta.Page], teaser)
	}

	// sort teasers by month inside their page group
	for _, teasersInPageGroup := range pagedTeasers {
		sort.Sort(helper.SortByMonth(teasersInPageGroup))
	}

	// flatten paged teasers and sort them by acsending page number
	for i := 1; i <= len(pagedTeasers); i++ {
		sortedTeasers = append(sortedTeasers, pagedTeasers[i]...)
	}

	// add missing year to sorted teasers
	var prevDate time.Time = time.Now()
	for i, teaser := range sortedTeasers {
		sortedTeasers[i].Date = date.AddMissingYear(teaser.Meta.DateString, &prevDate, date.DMYDot)
	}

	return sortedTeasers
}
