package scrape

import (
	"drilbur/pkg/model"
	"fmt"
)

func ScrapePages(parameters Parameters) map[string][]model.Teaser {
	Musicstore.setParameters(parameters)
	Musikersucht.setParameters(parameters)

	musikersuchtTeasers := scrapeTeasers(&Musikersucht)
	musicstoreTeasers := scrapeTeasers(&Musicstore)

	fmt.Println("Teasers: ", len(musicstoreTeasers), len(musikersuchtTeasers))

	return map[string][]model.Teaser{
		"musikersucht": musikersuchtTeasers,
		"musicstore":   musicstoreTeasers,
	}
}
