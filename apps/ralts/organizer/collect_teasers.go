package organizer

import (
	"encoding/json"
	"io"
	"net/http"
	"tonemato/apps/ralts/utils"
	"tonemato/pkg/model"
	"tonemato/pkg/url"
)

func CollectTeasers() map[string][]model.Teaser {
	var teasersCollections map[string][]model.Teaser = map[string][]model.Teaser{}

	for _, instrument := range model.Instruments {
		// request teasers in category
		var params string = "/scrape?instrument=" + instrument.Name + "&category=lookingForMusician"
		response, err := http.Get(url.Drilbur(params))
		if err != nil {
			utils.Zap.Error("Failed requesting drilbur with the error: " + err.Error())
			break
		}
		defer response.Body.Close()

		// read body
		responseBody, err := io.ReadAll(response.Body)
		if err != nil {
			utils.Zap.Error("Failed reading response body: " + err.Error())
			break
		}

		// convert body to scraped site
		var scrapedSites map[string][]model.Teaser
		if err := json.Unmarshal(responseBody, &scrapedSites); err != nil {
			utils.Zap.Error("Failed unmarshalling teaser site result: " + err.Error())
			break
		}

		// sort teasers of each site into query based collections
		for _, teasers := range scrapedSites {
			for _, teaser := range teasers {
				cacheKey, err := utils.GetParamKey(model.TeaserParams{
					Category:   "lookingForMusician",
					Instrument: instrument.Name,
					ZipCode:    teaser.ZipCode,
				})
				if err != nil {
					utils.Zap.Error("Failed to get param key : " + err.Error())
				}
				teasersCollections[cacheKey] = append(teasersCollections[cacheKey], teaser)
			}
		}
	}
	return teasersCollections
}
