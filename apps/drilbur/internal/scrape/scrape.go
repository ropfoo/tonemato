package scrape

import (
	"fmt"

	"github.com/gocolly/colly"
)

type Teaser struct {
	Url             string
	Date            string
	Title           string
	Description     string
	ZipCode         string
	City            string
	PreviewImageUrl string
	Domain          string
}

func Start() string {
	fmt.Println("Start the scraping fun!")
	collector := colly.NewCollector()

	teasers := make([]Teaser, 0)

	collector.OnHTML(".teaser", func(element *colly.HTMLElement) {

		var newTeaser Teaser

		element.ForEach(".teaser-body h4", func(index int, titleElement *colly.HTMLElement) {
			newTeaser.Title = titleElement.Text
		})

		element.ForEach(".teaser-text", func(index int, titleElement *colly.HTMLElement) {
			newTeaser.Description = titleElement.Text
		})

		teasers = append(teasers, newTeaser)

	})

	collector.OnScraped(func(r *colly.Response) {
		fmt.Println("yay its done!!", teasers)
	})

	collector.Visit("http://localhost:8080/mock")

	return "Test the scrape!!"
}
