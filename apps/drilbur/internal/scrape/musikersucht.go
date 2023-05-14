package scrape

import (
	"drilbur/pkg/model"

	"github.com/gocolly/colly"
)

type MusikersuchtPage struct {
	Config
}

func (mp *MusikersuchtPage) scrape(el *colly.HTMLElement) model.Teaser {
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
		// Description
		if index == 1 {
			teaser.Description = PrettifyDescription(textElement.Text[7:])
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
	return mp.Config
}
