package sites

import (
	"log"
	"strconv"
	"tonemato/apps/drilbur/internal/utils"
	"tonemato/pkg/date"
	"tonemato/pkg/model"

	"github.com/gocolly/colly"
)

type MukkenPage struct {
	model.ScrapeParameters
	model.ScrapeConfig
}

var Mukken = MukkenPage{
	ScrapeConfig: model.ScrapeConfig{
		TeaserTarget:    ".ad-carousel-item",
		PageCountTarget: ".pagination",
	},
}

func (mp *MukkenPage) Url(pageCount int) string {
	var page string = strconv.Itoa(pageCount)
	var instrument string = mp.ScrapeParameters.Instrument.MukkenID
	var baseUrl string = utils.GetBaseUrl("mukken")
	return baseUrl + "/" + instrument + "-p" + page
}

func (mp *MukkenPage) ScrapeTeaser(el *colly.HTMLElement) model.ScrapedTeaser {
	var teaser model.ScrapedTeaser

	// Url
	el.ForEach("a", func(index int, urlElement *colly.HTMLElement) {
		teaser.Url = "https://mukken.com" + urlElement.Attr("href")
	})
	// Date
	el.ForEach(".item-date", func(index int, dateElement *colly.HTMLElement) {
		formattedDateString := utils.PrettifyDescription(dateElement.Text)
		convertedDate, err := date.GetByFormat(formattedDateString, date.DMYDot)
		if err != nil {
			log.Print("could not convert date")
		}
		teaser.Date = convertedDate
	})
	// Title
	el.ForEach(".sm-ad-name", func(index int, titleElement *colly.HTMLElement) {
		teaser.Title = titleElement.Text
	})
	// Description
	el.ForEach(".item-content p", func(index int, textElement *colly.HTMLElement) {
		teaser.Description = utils.PrettifyDescription(textElement.Text)
	})
	// ZipCode
	// City
	el.ForEach(".item-location", func(index int, cityElement *colly.HTMLElement) {
		teaser.ZipCode = cityElement.Text[:5]
		teaser.City = cityElement.Text[6:]
	})
	// Preview Image Url
	el.ForEach(".user-image img", func(index int, imageElement *colly.HTMLElement) {
		if index == 0 {
			teaser.PreviewImageUrl = imageElement.Attr("data-src")
			return
		}
	})
	// Domain
	teaser.Domain = "mukken"
	return teaser
}

func (mp *MukkenPage) SetParameters(parameters model.ScrapeParameters) {
	mp.ScrapeParameters = parameters
}

func (mp *MukkenPage) Config() model.ScrapeConfig {
	return mp.ScrapeConfig
}

func (mp *MukkenPage) ScrapePageCount(el *colly.HTMLElement) int {
	var pageCount int = 4
	// code to get actual page count
	// el.ForEach(".page-number", func(index int, linkElement *colly.HTMLElement) {
	// 	if index == 4 {
	// 		number, err := strconv.Atoi(linkElement.Text)
	// 		if err != nil {
	// 			fmt.Println("Could not find page count")
	// 			return
	// 		}
	// 		pageCount = number
	// 	}
	// })
	return pageCount
}
