package scrape

import (
	"fmt"

	"github.com/gocolly/colly"
)

func Start() string {
	fmt.Println("Start the scraping fun!")
	collector := colly.NewCollector()

	collector.OnHTML(".teaser-body h4", func(element *colly.HTMLElement) {
		fmt.Println(element.Text)
	})

	collector.Visit("http://localhost:8080/mock")

	return "Test the scrape!!"
}
