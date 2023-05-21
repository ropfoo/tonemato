package scrape

import (
	"drilbur/pkg/date"
	"drilbur/pkg/model"
	"strconv"

	"github.com/gocolly/colly"
)

type MusicstorePage struct {
	Parameters
	Config
}

var Musicstore = MusicstorePage{
	Config: Config{
		TeaserTarget:    ".teaser",
		PageCountTarget: ".pagination-container",
	},
}

func (mp *MusicstorePage) Url(pageCount int) string {
	var page string = strconv.Itoa(pageCount)
	var category string = mp.Parameters.Category.MusicstoreID
	var instrument string = strconv.Itoa(mp.Parameters.Instrument.MusicstoreID)
	return "http://clobbopus:3001/musicstore/filter-ergebnisse/page/" +
		page +
		"/?category=" + category +
		"&instrument=" + instrument +
		"&age=alle"
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
		if index == 0 {
			teaser.PreviewImageUrl = imageElement.Attr("src")
			return
		}
	})
	// Domain
	teaser.Domain = "musicstore"
	return teaser
}

func (mp *MusicstorePage) setParameters(parameters Parameters) {
	mp.Parameters = parameters
}

func (mp *MusicstorePage) config() Config {
	return mp.Config
}

func (mp *MusicstorePage) scrapePageCount(el *colly.HTMLElement) int {
	var pageCount int = 0
	el.ForEach(".pagination-link", func(index int, linkElement *colly.HTMLElement) {
		pageCount++
	})
	return pageCount
}
