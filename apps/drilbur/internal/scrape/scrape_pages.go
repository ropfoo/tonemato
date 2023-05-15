package scrape

import "drilbur/pkg/model"

func ScrapePages(parameters Parameters) map[string][]model.Teaser {
	musicstorePage := MusicstorePage{
		Parameters: parameters,
		Config: Config{
			Url:             "http://localhost:8080/mock/musicstore",
			TeaserTarget:    ".teaser",
			PageCountTarget: ".pagination-container",
		},
	}

	musikersuchtPage := MusikersuchtPage{
		Parameters: parameters,
		Config: Config{
			Url:             "http://localhost:8080/mock/musikersucht",
			TeaserTarget:    ".table-striped tr",
			PageCountTarget: ".pagination",
		},
	}

	musikersuchtTeasers := scrapeTeaserPage(&musikersuchtPage)
	musicstoreTeasers := scrapeTeaserPage(&musicstorePage)

	return map[string][]model.Teaser{
		"musikersucht": musikersuchtTeasers,
		"musicstore":   musicstoreTeasers,
	}
}

func scrapeTeaserPage(scraper TeaserScraper) []model.Teaser {
	teaserChannel := make(chan []model.Teaser)
	go scrapeTeasers(scraper, teaserChannel)
	return <-teaserChannel
}
