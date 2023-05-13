package scrape

import (
	"drilbur/pkg/model"
	"time"

	"github.com/gocolly/colly"
)

type Config struct {
	Url   string
	Entry string
}

type TeaserScraper interface {
	getUrl(*colly.HTMLElement) string
	getDate(*colly.HTMLElement) time.Time
	getTitle(*colly.HTMLElement) string
	getDescription(*colly.HTMLElement) string
	getZipCode(*colly.HTMLElement) string
	getCity(*colly.HTMLElement) string
	getPreviewImageUrl(*colly.HTMLElement) string
	getDomain() string
	config() Config
}

func Init(scraper TeaserScraper) []model.Teaser {
	collector := colly.NewCollector()

	teasers := make([]model.Teaser, 0)
	config := scraper.config()

	collector.OnHTML(config.Entry, func(element *colly.HTMLElement) {
		var newTeaser model.Teaser
		newTeaser.Url = scraper.getUrl(element)
		newTeaser.Date = scraper.getDate(element)
		newTeaser.Title = scraper.getTitle(element)
		newTeaser.Description = scraper.getDescription(element)
		newTeaser.ZipCode = scraper.getZipCode(element)
		newTeaser.City = scraper.getCity(element)
		newTeaser.PreviewImageUrl = scraper.getPreviewImageUrl(element)
		newTeaser.Domain = scraper.getDomain()
		teasers = append(teasers, newTeaser)
	})

	collector.Visit(config.Url)

	return teasers
}
