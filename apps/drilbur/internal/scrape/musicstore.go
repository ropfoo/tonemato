package scrape

import (
	"drilbur/pkg/date"
	"strings"
	"time"

	"github.com/gocolly/colly"
)

type MusicstoreScrape struct {
	Config
}

// Url
func (ms *MusicstoreScrape) getUrl(el *colly.HTMLElement) string {
	var url string
	el.ForEach(".teaser-content a", func(index int, urlElement *colly.HTMLElement) {
		url = urlElement.Attr("href")
	})
	return url
}

// Date
func (ms *MusicstoreScrape) getDate(el *colly.HTMLElement) time.Time {
	var time time.Time
	el.ForEach(".date", func(index int, dateElement *colly.HTMLElement) {
		time, _ = date.GetByFormat(dateElement.Text, date.DMYDot)
	})
	return time
}

// Title
func (ms *MusicstoreScrape) getTitle(el *colly.HTMLElement) string {
	var title string
	el.ForEach(".teaser-body h4", func(index int, titleElement *colly.HTMLElement) {
		title = titleElement.Text
	})
	return title
}

// Description
func (ms *MusicstoreScrape) getDescription(el *colly.HTMLElement) string {
	var description string
	el.ForEach(".teaser-text", func(index int, textElement *colly.HTMLElement) {
		descriptionWithoutLineBreaks := strings.ReplaceAll(textElement.Text, "\n", " ")
		description = strings.TrimSpace(
			strings.ReplaceAll(descriptionWithoutLineBreaks, "  ", ""),
		)
	})
	return description
}

// ZipCode
func (ms *MusicstoreScrape) getZipCode(el *colly.HTMLElement) string {
	var zipCode string
	el.ForEach(".city", func(index int, cityElement *colly.HTMLElement) {
		zipCode = cityElement.Text[0:5]
		// newTeaser.City = cityElement.Text[7:]
	})
	return zipCode
}

// City
func (ms *MusicstoreScrape) getCity(el *colly.HTMLElement) string {
	var city string
	el.ForEach(".city", func(index int, cityElement *colly.HTMLElement) {
		city = cityElement.Text[7:]
	})
	return city
}

// Preview Image Url
func (ms *MusicstoreScrape) getPreviewImageUrl(el *colly.HTMLElement) string {
	var previewImageUrl string
	el.ForEach("img", func(index int, imageElement *colly.HTMLElement) {
		if index == 1 {
			previewImageUrl = imageElement.Attr("src")
		}
	})
	return previewImageUrl
}

func (ms *MusicstoreScrape) getDomain() string {
	return "musicstore"
}

func (ms *MusicstoreScrape) config() Config {
	return ms.Config
}
