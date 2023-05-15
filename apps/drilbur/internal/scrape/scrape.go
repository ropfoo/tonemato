package scrape

import (
	"drilbur/pkg/model"
	"time"

	"github.com/gocolly/colly"
)

type Config struct {
	Url          string
	TeaserTarget string
}

type Parameters struct {
	model.Instrument
	model.Category
}

type TeaserScraper interface {
	scrape(*colly.HTMLElement) model.Teaser
	config() Config
	pageCount() int
}

var YEAR_THRESHOLD = time.Now().Year() - 3

func Teasers(scraper TeaserScraper, channel chan []model.Teaser) {
	collector := colly.NewCollector()
	config := scraper.config()
	teasers := make([]model.Teaser, 0)

	collector.OnHTML(config.TeaserTarget, func(element *colly.HTMLElement) {
		newTeaser := scraper.scrape(element)
		// Append teaser if it passes year threshold
		if newTeaser.Date.Year() > YEAR_THRESHOLD {
			teasers = append(teasers, newTeaser)
		}
	})
	collector.Visit(config.Url)
	channel <- teasers
}
