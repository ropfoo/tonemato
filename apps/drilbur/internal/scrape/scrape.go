package scrape

import (
	"drilbur/pkg/model"
	"fmt"
	"sync"

	"github.com/gocolly/colly"
)

type Config struct {
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
	setParameters(parameters Parameters)
	Url(pageCount int) string
	config() Config
}

func scrapeTeaserSite(scraper TeaserScraper, channel chan model.Teaser) {
	config := scraper.config()
	pageCount := 1

	// create function to scrape all teasers on each page
	collectTeasers := func(page int, wg *sync.WaitGroup) {
		collector := colly.NewCollector()
		defer wg.Done()
		// DEBUG ONLY: artificial delay
		// time.Sleep(time.Second)
		collector.OnHTML(config.TeaserTarget, func(element *colly.HTMLElement) {
			newTeaser := scraper.scrapeTeaser(element)
			// check if element qualifies as a teaser
			if newTeaser.Description != "" {
				channel <- newTeaser
			}
		})
		// get page count on first scrape
		if pageCount == 1 {
			collector.OnHTML(config.PageCountTarget, func(element *colly.HTMLElement) {
				pageCount = scraper.scrapePageCount(element)
			})
		}
		fmt.Println("Scraping: ", scraper.Url(page))
		collector.Visit(scraper.Url(page))
	}

	waitGroup := &sync.WaitGroup{}
	// get page count and collect teasers of first page
	waitGroup.Add(1)
	collectTeasers(1, waitGroup)
	// iterate through all pages left in different go routines
	if pageCount > 1 {
		for page := 2; page <= pageCount; page++ {
			waitGroup.Add(1)
			go collectTeasers(page, waitGroup)
		}
	}
	waitGroup.Wait()
	close(channel)
}

func scrapeTeasers(scraper TeaserScraper) []model.Teaser {
	teaserChannel := make(chan model.Teaser)
	go scrapeTeaserSite(scraper, teaserChannel)
	var teasers []model.Teaser
	for newTeaser := range teaserChannel {
		teasers = append(teasers, newTeaser)
	}
	return teasers
}
