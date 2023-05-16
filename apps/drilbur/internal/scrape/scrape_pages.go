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

	musikersuchtChannel := make(chan []model.Teaser)
	musicstoreChannel := make(chan []model.Teaser)
	go scrapeTeasers(&musikersuchtPage, musikersuchtChannel)
	go scrapeTeasers(&musicstorePage, musicstoreChannel)

	musikersuchtTeasers := <-musikersuchtChannel
	musicstoreTeasers := <-musicstoreChannel

	return map[string][]model.Teaser{
		"musikersucht": musikersuchtTeasers,
		"musicstore":   musicstoreTeasers,
	}
}
