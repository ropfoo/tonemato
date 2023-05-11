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
	Domain          string    `json:"domain"`
}
