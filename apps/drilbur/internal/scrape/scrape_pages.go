package scrape

import "drilbur/pkg/model"

func ScrapePages(parameters Parameters) map[string][]model.Teaser {
	musicstorePage := MusicstorePage{
		Parameters: parameters,
		Config: Config{
			Url:          "http://localhost:8080/mock/musicstore",
			TeaserTarget: ".teaser",
		},
	}

	musikersuchtPage := MusikersuchtPage{
		Parameters: parameters,
		Config: Config{
			Url:          "http://localhost:8080/mock/musikersucht",
			TeaserTarget: ".table-striped tr",
		},
	}

	musikersuchtTeasers := scrapeTeasers(&musikersuchtPage)
	musicstoreTeasers := scrapeTeasers(&musicstorePage)

	return map[string][]model.Teaser{
		"musikersucht": musikersuchtTeasers,
		"musicstore":   musicstoreTeasers,
	}
}

func scrapeTeasers(scraper TeaserScraper) []model.Teaser {
	teaserChannel := make(chan []model.Teaser)
	go Teasers(scraper, teaserChannel)
	return <-teaserChannel
}
