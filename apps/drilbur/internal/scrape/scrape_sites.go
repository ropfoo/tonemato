package scrape

import (
	"tonemato/apps/drilbur/internal/cleanup"
	"tonemato/apps/drilbur/internal/sites"
	"tonemato/pkg/model"
)

func ScrapeSites(parameters model.ScrapeParameters) map[string][]model.ScrapedTeaser {
	sites.Musicstore.SetParameters(parameters)
	sites.Musikersucht.SetParameters(parameters)

	musikersuchtTeasers := scrapeTeasers(&sites.Musikersucht)
	// musicstoreTeasers := scrapeTeasers(&sites.Musicstore)

	return map[string][]model.ScrapedTeaser{
		"musikersucht": cleanup.AddMissingTeaserYears(musikersuchtTeasers),
		// "musicstore":   musicstoreTeasers,
	}
}
