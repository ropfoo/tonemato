package scrape

import (
	"drilbur/pkg/date"
	"drilbur/pkg/model"
	"fmt"

	"github.com/gocolly/colly"
)

type MusikersuchtPage struct {
	Parameters
	Config
}

func (mp *MusikersuchtPage) scrapeTeaser(el *colly.HTMLElement) model.Teaser {
	var teaser model.Teaser

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
			teaser.Description = PrettifyDescription(textElement.Text[7:])
			// Date
			dateString := textElement.Text[:6]
			teaser.Date = date.AddMissingYear(dateString, date.DMYDot)
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

func (mp *MusikersuchtPage) config() Config {
	fmt.Println("parameters for musikersucht:  ",
		mp.Parameters.Instrument.MusikersuchtID,
		mp.Parameters.Category.MusikersuchtID,
	)
	return mp.Config
}

func (mp *MusikersuchtPage) scrapePageCount(el *colly.HTMLElement) int {
	var pageCount int = 1
	el.ForEach("a", func(index int, listElement *colly.HTMLElement) {
		if listElement.Attr("currenttag") == "a" {
			pageCount++
		}
	})
	return pageCount
}
