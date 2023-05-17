package scrape

import (
	"drilbur/pkg/model"
	"fmt"
	"sync"
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
	setParameters(parameters Parameters)
	config() Config
}

var YEAR_THRESHOLD = time.Now().Year() - 3

func scrapeTeasers(scraper TeaserScraper, channel chan []model.Teaser) {
	collector := colly.NewCollector()
	config := scraper.config()
	firstPageTeasers := make([]model.Teaser, 0)
	teasers := make([]model.Teaser, 0)
	pageCount := 1

	// channel for all teasers getting scraped in go routines
	collectTeasersChannel := make(chan []model.Teaser)
	// create function to scrape all teasers on each page
	collectTeasers := func(page int, wg *sync.WaitGroup) {
		defer wg.Done()

		// DEBUG ONLY: artificial delay
		time.Sleep(time.Second)

		var collectedTeasers []model.Teaser
		collector.OnHTML(config.TeaserTarget, func(element *colly.HTMLElement) {
			newTeaser := scraper.scrapeTeaser(element)
			// append teaser if it passes year threshold
			if newTeaser.Date.Year() > YEAR_THRESHOLD {
				collectedTeasers = append(collectedTeasers, newTeaser)
				// on first page - store teasers in a separete slice
				// this is necessary since the first page is not part of a go routine
				if pageCount == 1 {
					firstPageTeasers = append(firstPageTeasers, newTeaser)
				}
			}
		})
		// get page count on first scrape
		if pageCount == 1 {
			collector.OnHTML(config.PageCountTarget, func(element *colly.HTMLElement) {
				pageCount = scraper.scrapePageCount(element)
			})
		}
		// go to page url
		collector.Visit(config.Url + "?pageCount=" + fmt.Sprint(page))
		// add collectedTeasers to channel
		collectTeasersChannel <- collectedTeasers
	}

	// create go routine to scrape pages concurrently
	go func() {
		waitGroup := sync.WaitGroup{}
		waitGroup.Add(1)
		// get page count and collect teasers of first page
		collectTeasers(1, &waitGroup)

		// iterate through all pages left in different go routines
		if pageCount > 1 {
			for page := 2; page <= pageCount; page++ {
				waitGroup.Add(1)
				go collectTeasers(page, &waitGroup)
			}
		}
		waitGroup.Wait()
		close(collectTeasersChannel)
	}()
	// recieve teasers from channel
	for chanTeasers := range collectTeasersChannel {
		teasers = chanTeasers
	}
	// add teasers of the first page to the teasers recieved by the collectChannel
	teasers = append(teasers, firstPageTeasers...)
	// return all teasers to the main channel
	channel <- teasers
}
