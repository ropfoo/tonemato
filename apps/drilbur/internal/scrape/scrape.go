package scrape

import (
	"fmt"
	"sync"
	"tonemato/pkg/model"

	"github.com/gocolly/colly"
)

func scrapeTeaserSite(scraper model.TeaserScraper, channel chan model.ScrapedTeaser) {
	config := scraper.Config()
	pageCount := 1

	// create function to scrape all teasers on each page
	collectTeasers := func(page int, wg *sync.WaitGroup) {
		collector := colly.NewCollector()
		defer wg.Done()
		// DEBUG ONLY: artificial delay
		// time.Sleep(time.Second)
		collector.OnHTML(config.TeaserTarget, func(element *colly.HTMLElement) {
			newTeaser := scraper.ScrapeTeaser(element)
			// check if element qualifies as a teaser
			if newTeaser.Description != "" {
				newTeaser.Meta.Page = page
				channel <- newTeaser
			}
		})
		// get page count on first scrape
		if pageCount == 1 {
			collector.OnHTML(config.PageCountTarget, func(element *colly.HTMLElement) {
				pageCount = scraper.ScrapePageCount(element)
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

func scrapeTeasers(scraper model.TeaserScraper) []model.ScrapedTeaser {
	scrapedTeaserChannel := make(chan model.ScrapedTeaser)
	go scrapeTeaserSite(scraper, scrapedTeaserChannel)
	var scrapedTeasers []model.ScrapedTeaser
	for newTeaser := range scrapedTeaserChannel {
		scrapedTeasers = append(scrapedTeasers, newTeaser)
	}
	return scrapedTeasers
}
