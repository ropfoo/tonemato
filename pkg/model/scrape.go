package model

import "github.com/gocolly/colly"

type ScrapeConfig struct {
	TeaserTarget    string
	PageCountTarget string
}

type ScrapeParameters struct {
	Instrument
	Category
}

type TeaserScraper interface {
	ScrapeTeaser(*colly.HTMLElement) Teaser
	ScrapePageCount(*colly.HTMLElement) int
	SetParameters(parameters ScrapeParameters)
	Url(pageCount int) string
	Config() ScrapeConfig
}
