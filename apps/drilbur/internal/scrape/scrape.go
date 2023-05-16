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
	config() Config
}

var YEAR_THRESHOLD = time.Now().Year() - 3

func scrapeTeasers(scraper TeaserScraper, channel chan []model.Teaser) {
	collector := colly.NewCollector()
	config := scraper.config()
	teasers := make([]model.Teaser, 0)
	pageCount := 1
	collectChannel := make(chan []model.Teaser)

	// get page count
	// TODO: scrape teasers of first page to avoid second visit
	if pageCount == 1 {
		collector.OnHTML(config.PageCountTarget, func(element *colly.HTMLElement) {
			pageCount = scraper.scrapePageCount(element)
		})
		collector.Visit(config.Url)
	}

	// create function to scrape all teasers on each page
	collectTeasers := func(page int, wg *sync.WaitGroup) {
		defer wg.Done()
		var collectedTeasers []model.Teaser
		collector.OnHTML(config.TeaserTarget, func(element *colly.HTMLElement) {
			newTeaser := scraper.scrapeTeaser(element)
			// append teaser if it passes year threshold
			if newTeaser.Date.Year() > YEAR_THRESHOLD {
				collectedTeasers = append(collectedTeasers, newTeaser)
			}
		})

		// DEBUG ONLY: artificial delay
		time.Sleep(time.Second)

		// go to page url
		collector.Visit(config.Url + "?pageCount=" + fmt.Sprint(page))
		// add collectedTeasers to channel
		collectChannel <- collectedTeasers

	}

	// create go routine to scrape pages concurrently
	go func() {
		waitGroup := sync.WaitGroup{}
		for page := 1; page < pageCount; page++ {
			waitGroup.Add(1)
			go collectTeasers(page, &waitGroup)
		}
		waitGroup.Wait()
		close(collectChannel)
	}()
	// recieve teasers from channel
	for chanTeasers := range collectChannel {
		teasers = chanTeasers
	}
	channel <- teasers
}
