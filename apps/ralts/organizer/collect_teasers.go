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

func CollectTeasers() []model.Teaser {

	var collectedTeasers []model.Teaser = make([]model.Teaser, 0)

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

		// add teasers of each site to collectedTeasers array
		for _, siteTeasers := range scrapedSites {
			collectedTeasers = append(collectedTeasers, siteTeasers...)
		}
	}
	return collectedTeasers
}
