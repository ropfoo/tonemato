package scrape

import (
	"drilbur/pkg/model"
)

func ScrapeSites(parameters Parameters) map[string][]model.Teaser {
	Musicstore.setParameters(parameters)
	Musikersucht.setParameters(parameters)

	musikersuchtTeasers := scrapeTeasers(&Musikersucht)
	musicstoreTeasers := scrapeTeasers(&Musicstore)

	return map[string][]model.Teaser{
		"musikersucht": musikersuchtTeasers,
		"musicstore":   musicstoreTeasers,
	}
}
