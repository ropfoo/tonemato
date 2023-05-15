package scrape

import (
	"drilbur/pkg/date"
	"drilbur/pkg/model"
	"fmt"

	"github.com/gocolly/colly"
)

type MusicstorePage struct {
	Parameters
	Config
}

func (mp *MusicstorePage) scrapeTeaser(el *colly.HTMLElement) model.Teaser {
	var teaser model.Teaser

	// Url
	el.ForEach(".teaser-content a", func(index int, urlElement *colly.HTMLElement) {
		teaser.Url = urlElement.Attr("href")
	})
	// Date
	el.ForEach(".date", func(index int, dateElement *colly.HTMLElement) {
		teaser.Date, _ = date.GetByFormat(dateElement.Text, date.DMYDot)
	})
	// Title
	el.ForEach(".teaser-body h4", func(index int, titleElement *colly.HTMLElement) {
		teaser.Title = titleElement.Text
	})
	// Description
	el.ForEach(".teaser-text", func(index int, textElement *colly.HTMLElement) {
		teaser.Description = PrettifyDescription(textElement.Text)
	})
	// ZipCode
	// City
	el.ForEach(".city", func(index int, cityElement *colly.HTMLElement) {
		teaser.ZipCode = cityElement.Text[0:5]
		teaser.City = cityElement.Text[7:]
	})
	// Preview Image Url
	el.ForEach(".teaser-image img", func(index int, imageElement *colly.HTMLElement) {
		if index == 1 {
			teaser.PreviewImageUrl = imageElement.Attr("src")
		}
	})
	// Domain
	teaser.Domain = "musicstore"
	return teaser
}

func (mp *MusicstorePage) config() Config {
	fmt.Println("parameters for musicstore:  ",
		mp.Parameters.Instrument.MusicstoreID,
		mp.Parameters.Category.MusicstoreIdID,
	)
	return mp.Config
}

func (mp *MusicstorePage) scrapePageCount(el *colly.HTMLElement) int {
	var pageCount int = 0
	el.ForEach(".pagination-link", func(index int, linkElement *colly.HTMLElement) {
		pageCount++
	})
	return pageCount
}
