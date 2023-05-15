package scrape

import (
	"drilbur/pkg/model"
	"fmt"
	"time"

	"github.com/gocolly/colly"
)

type Config struct {
	Url             string
	TeaserTarget    string
	PageCountTarget string
}

type Parameters struct {
	model.Instrument
	model.Category
}

type TeaserScraper interface {
	scrapeTeaser(*colly.HTMLElement) model.Teaser
	scrapePageCount(*colly.HTMLElement) int
	config() Config
}

var YEAR_THRESHOLD = time.Now().Year() - 3

func scrapeTeasers(scraper TeaserScraper, channel chan []model.Teaser) {
	collector := colly.NewCollector()
	config := scraper.config()
	teasers := make([]model.Teaser, 0)

	pageCount := 1
	currentPage := 1

	var collect func()
	collect = func() {
		// get initial page count
		if pageCount == 1 {
			collector.OnHTML(config.PageCountTarget, func(element *colly.HTMLElement) {
				pageCount = scraper.scrapePageCount(element)
			})
		}
		collector.OnHTML(config.TeaserTarget, func(element *colly.HTMLElement) {
			newTeaser := scraper.scrapeTeaser(element)
			// append teaser if it passes year threshold
			if newTeaser.Date.Year() > YEAR_THRESHOLD {
				teasers = append(teasers, newTeaser)
			}
		})
		// collect by page number
		collector.Visit(config.Url + "?pageCount=" + fmt.Sprint(currentPage))
		// collect pages until max page count is reached
		if currentPage < pageCount {
			currentPage++
			collect()
		}
	}
	collect()
	fmt.Println(pageCount)
	channel <- teasers
}
