package scrape

import (
	"drilbur/pkg/date"
	"time"

	"github.com/gocolly/colly"
)

type MusicstorePage struct {
	Config
}

// Url
func (mp *MusicstorePage) getUrl(el *colly.HTMLElement) string {
	var url string
	el.ForEach(".teaser-content a", func(index int, urlElement *colly.HTMLElement) {
		url = urlElement.Attr("href")
	})
	return url
}

// Date
func (mp *MusicstorePage) getDate(el *colly.HTMLElement) time.Time {
	var time time.Time
	el.ForEach(".date", func(index int, dateElement *colly.HTMLElement) {
		time, _ = date.GetByFormat(dateElement.Text, date.DMYDot)
	})
	return time
}

// Title
func (mp *MusicstorePage) getTitle(el *colly.HTMLElement) string {
	var title string
	el.ForEach(".teaser-body h4", func(index int, titleElement *colly.HTMLElement) {
		title = titleElement.Text
	})
	return title
}

// Description
func (mp *MusicstorePage) getDescription(el *colly.HTMLElement) string {
	var description string
	el.ForEach(".teaser-text", func(index int, textElement *colly.HTMLElement) {
		description = PrettifyDescription(textElement.Text)
	})
	return description
}

// ZipCode
func (mp *MusicstorePage) getZipCode(el *colly.HTMLElement) string {
	var zipCode string
	el.ForEach(".city", func(index int, cityElement *colly.HTMLElement) {
		zipCode = cityElement.Text[0:5]
		// newTeaser.City = cityElement.Text[7:]
	})
	return zipCode
}

// City
func (mp *MusicstorePage) getCity(el *colly.HTMLElement) string {
	var city string
	el.ForEach(".city", func(index int, cityElement *colly.HTMLElement) {
		city = cityElement.Text[7:]
	})
	return city
}

// Preview Image Url
func (mp *MusicstorePage) getPreviewImageUrl(el *colly.HTMLElement) string {
	var previewImageUrl string
	el.ForEach(".teaser-image img", func(index int, imageElement *colly.HTMLElement) {
		if index == 1 {
			previewImageUrl = imageElement.Attr("src")
		}
	})
	return previewImageUrl
}

// Domain
func (mp *MusicstorePage) getDomain() string {
	return "musicstore"
}

func (mp *MusicstorePage) config() Config {
	return mp.Config
}
