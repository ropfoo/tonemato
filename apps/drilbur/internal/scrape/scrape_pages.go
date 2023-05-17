package scrape

import "drilbur/pkg/model"

func ScrapePages(parameters Parameters) map[string][]model.Teaser {
	Musicstore.setParameters(parameters)
	Musikersucht.setParameters(parameters)

	musikersuchtChannel := make(chan []model.Teaser)
	musicstoreChannel := make(chan []model.Teaser)
	go scrapeTeasers(&Musikersucht, musikersuchtChannel)
	go scrapeTeasers(&Musicstore, musicstoreChannel)

	musikersuchtTeasers := <-musikersuchtChannel
	musicstoreTeasers := <-musicstoreChannel

	return map[string][]model.Teaser{
		"musikersucht": musikersuchtTeasers,
		"musicstore":   musicstoreTeasers,
	}
}
