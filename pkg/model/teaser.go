package model

import "time"

type TeaserScrapeMetaInfo struct {
	Meta struct {
		Page       int    `json:"page"`
		DateString string `json:"dateString"`
		Order      int    `json:"order"`
	} `json:"meta"`
}

type Teaser struct {
	Url             string    `json:"url"`
	Date            time.Time `json:"date"`
	Title           string    `json:"title"`
	Description     string    `json:"description"`
	ZipCode         string    `json:"zipCode"`
	City            string    `json:"city"`
	PreviewImageUrl string    `json:"previewImageUrl"`
	Domain          Domain    `json:"domain"`
}

type ScrapedTeaser struct {
	Teaser
	TeaserScrapeMetaInfo
}

type TeaserParams struct {
	Instrument string `json:"instrument"`
	Category   string `json:"category"`
	ZipCode    string `json:"zipCode"`
}
