package scrape

import (
	"drilbur/pkg/date"
	"drilbur/pkg/model"
	"time"

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
		if index == 1 {
			// Description
			teaser.Description = PrettifyDescription(textElement.Text[7:])
			// Date
			dateString := textElement.Text[:6]
			teaser.Date = date.AddMissingYear(
				dateString,
				date.DMYDot,
				time.Now().Year(),
			)
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
