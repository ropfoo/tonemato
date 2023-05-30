package sites

import (
	"strconv"

	"tonemato/apps/drilbur/internal/utils"
	"tonemato/pkg/model"

	"github.com/gocolly/colly"
)

type MusikersuchtPage struct {
	model.ScrapeParameters
	model.ScrapeConfig
}

var Musikersucht = MusikersuchtPage{
	ScrapeConfig: model.ScrapeConfig{
		TeaserTarget:    ".table-striped tbody tr",
		PageCountTarget: ".pagination",
	},
}

func (mp *MusikersuchtPage) Url(pageCount int) string {
	var page string = strconv.Itoa(pageCount)
	var category string = mp.ScrapeParameters.Category.MusikersuchtID
	var instrument string = strconv.Itoa(mp.ScrapeParameters.Instrument.MusikersuchtID)
	var baseUrl string = utils.GetBaseUrl("musikersucht")
	return baseUrl +
		"/" + category +
		"/instrument:" + instrument +
		"/page:" + page
}

func (mp *MusikersuchtPage) ScrapeTeaser(el *colly.HTMLElement) model.ScrapedTeaser {
	var teaser model.ScrapedTeaser

	// URL
	el.ForEach("a", func(index int, urlElement *colly.HTMLElement) {
		teaser.Url = "https://musiker-sucht.de" + urlElement.Attr("href")
	})
	el.ForEach("td", func(index int, textElement *colly.HTMLElement) {
		// Tilte
		if index == 0 {
			teaser.Title = textElement.Text
		}
		if index == 1 {
			// Description
			teaser.Description = utils.PrettifyDescription(textElement.Text[7:])
			// Date
			teaser.Meta.DateString = textElement.Text[:6]
		}
		// ZipCode
		// City
		if index == 3 {
			teaser.ZipCode = textElement.Text[2:7]
			teaser.City = textElement.Text[7:]
		}
	})
	// Domain
	teaser.Domain = "musikersucht"
	return teaser
}

func (mp *MusikersuchtPage) SetParameters(parameters model.ScrapeParameters) {
	mp.ScrapeParameters = parameters
}

func (mp *MusikersuchtPage) Config() model.ScrapeConfig {
	return mp.ScrapeConfig
}

func (mp *MusikersuchtPage) ScrapePageCount(el *colly.HTMLElement) int {
	var pageCount int = 1
	el.ForEach("a", func(index int, listElement *colly.HTMLElement) {
		if listElement.Attr("currenttag") == "a" {
			pageCount++
		}
	})
	return pageCount
}
