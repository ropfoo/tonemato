package scrape

import (
	"drilbur/pkg/date"
	"drilbur/pkg/model"
	"fmt"
	"strings"

	"github.com/gocolly/colly"
)

type Teaser = model.Teaser

func Musicstore() []Teaser {
	fmt.Println("Start the scraping fun!")
	collector := colly.NewCollector()

	teasers := make([]Teaser, 0)

	collector.OnHTML(".teaser", func(element *colly.HTMLElement) {

		var newTeaser Teaser

		// Url
		element.ForEach(".teaser-content a", func(index int, urlElement *colly.HTMLElement) {
			newTeaser.Url = urlElement.Attr("href")
		})

		// Date
		element.ForEach(".date", func(index int, dateElement *colly.HTMLElement) {
			newTeaser.Date = date.GetByGermanFormat(dateElement.Text)
		})

		// Title
		element.ForEach(".teaser-body h4", func(index int, titleElement *colly.HTMLElement) {
			newTeaser.Title = titleElement.Text
		})

		// Description
		element.ForEach(".teaser-text", func(index int, textElement *colly.HTMLElement) {
			descriptionWithoutLineBreaks := strings.ReplaceAll(textElement.Text, "\n", " ")
			newTeaser.Description = strings.TrimSpace(
				strings.ReplaceAll(descriptionWithoutLineBreaks, "  ", ""),
			)
		})

		// ZipCode
		// City
		element.ForEach(".city", func(index int, cityElement *colly.HTMLElement) {
			newTeaser.ZipCode = cityElement.Text[0:5]
			newTeaser.City = cityElement.Text[7:]
		})

		// PreviewImageUrl
		element.ForEach("img", func(index int, imageElement *colly.HTMLElement) {
			if index == 1 {
				newTeaser.PreviewImageUrl = imageElement.Attr("src")
			}
		})

		// Domain
		newTeaser.Domain = model.Musicstore

		teasers = append(teasers, newTeaser)

	})

	collector.Visit("http://localhost:8080/mock/musicstore")

	return teasers
}
