package scrape

import (
	"drilbur/pkg/model"

	"github.com/gocolly/colly"
)

type Config struct {
	Url          string
	TeaserTarget string
}

type TeaserScraper interface {
	scrape(*colly.HTMLElement) model.Teaser
	config() Config
}

func Teasers(scraper TeaserScraper) []model.Teaser {
	collector := colly.NewCollector()
	config := scraper.config()
	teasers := make([]model.Teaser, 0)

	collector.OnHTML(config.TeaserTarget, func(element *colly.HTMLElement) {
		newTeaser := scraper.scrape(element)

		if newTeaser.Title != "" || newTeaser.Description != "" {
			teasers = append(teasers, newTeaser)
		}
	})

	collector.Visit(config.Url)

	return teasers
}
