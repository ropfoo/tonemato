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

	musicstoreChannel := make(chan []model.Teaser)
	go Teasers(&musicstorePage, musicstoreChannel)

	musikersuchtChannel := make(chan []model.Teaser)
	go Teasers(&musikersuchtPage, musikersuchtChannel)

	musikersuchtTeasers := <-musikersuchtChannel
	musicstoreTeasers := <-musicstoreChannel

	return map[string][]model.Teaser{
		"musikersucht": musikersuchtTeasers,
		"musicstore":   musicstoreTeasers,
	}
}
