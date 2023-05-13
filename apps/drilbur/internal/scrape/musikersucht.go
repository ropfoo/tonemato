package scrape

import (
	"time"

	"github.com/gocolly/colly"
)

type MusikersuchtPage struct {
	Config
}

func (mp *MusikersuchtPage) getUrl(el *colly.HTMLElement) string {
	var url string
	el.ForEach("a", func(index int, urlElement *colly.HTMLElement) {
		url = "https://musiker-sucht.de" + urlElement.Attr("href")
	})
	return url
}

func (mp *MusikersuchtPage) getDate(el *colly.HTMLElement) time.Time {
	return time.Now()
}

func (mp *MusikersuchtPage) getTitle(el *colly.HTMLElement) string {
	var title string
	el.ForEach("td", func(index int, titleElement *colly.HTMLElement) {
		if index == 0 {
			title = titleElement.Text
		}
	})
	return title
}

func (mp *MusikersuchtPage) getDescription(el *colly.HTMLElement) string {
	var description string
	el.ForEach("td", func(index int, textElement *colly.HTMLElement) {
		if index == 1 {
			description = PrettifyDescription(textElement.Text[7:])
		}
	})
	return description
}

// ZipCode
func (mp *MusikersuchtPage) getZipCode(el *colly.HTMLElement) string {
	var zipCode string
	el.ForEach("td", func(index int, textElement *colly.HTMLElement) {
		if index == 3 {
			zipCode = textElement.Text[2:7]
		}
	})
	return zipCode
}

// City
func (mp *MusikersuchtPage) getCity(el *colly.HTMLElement) string {
	var city string
	el.ForEach("td", func(index int, cityElement *colly.HTMLElement) {
		if index == 3 {
			city = cityElement.Text[7:]
		}
	})
	return city
}

// Preview Image Url
func (mp *MusikersuchtPage) getPreviewImageUrl(el *colly.HTMLElement) string {
	var previewImageUrl string
	return previewImageUrl
}

// Domain
func (mp *MusikersuchtPage) getDomain() string {
	return "musikersucht"
}

func (mp *MusikersuchtPage) config() Config {
	return mp.Config
}
