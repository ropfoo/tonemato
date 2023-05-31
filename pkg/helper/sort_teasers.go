package helper

import (
	"sort"
	"tonemato/pkg/model"
)

func SortTeaserByOrder(scrapedTeasers []model.ScrapedTeaser) {
	sort.Slice(scrapedTeasers, func(i, j int) bool {
		return scrapedTeasers[i].Meta.Order < scrapedTeasers[j].Meta.Order
	})
}

func SortTeasersByDate[T model.TeaserInterface](teasers []T) {
	sort.Slice(teasers, func(i, j int) bool {
		return teasers[i].GetDate().After(teasers[j].GetDate())
	})
}
