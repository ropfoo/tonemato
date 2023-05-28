package model

import "time"

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

type TeaserParams struct {
	Instrument string `json:"instrument"`
	Category   string `json:"category"`
	ZipCode    string `json:"zipCode"`
}
