package organizer

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
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
			log.Fatal(err)
		}
		defer response.Body.Close()

		// read body
		responseBody, err := io.ReadAll(response.Body)
		if err != nil {
			log.Fatalln(err)
		}

		// convert body to scraped site
		var scrapedSites map[string][]model.Teaser
		if err := json.Unmarshal(responseBody, &scrapedSites); err != nil {
			fmt.Println(err)
		}

		// sort teasers of each site into query based collections
		for _, teasers := range scrapedSites {
			for _, teaser := range teasers {
				var regionKey = string(teaser.ZipCode[0])
				teasersCollections[regionKey] = append(teasersCollections[regionKey], teaser)
			}
		}
	}
	return teasersCollections
}