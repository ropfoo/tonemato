package main

import (
	"drilbur/internal/scrape"
	"drilbur/pkg/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		instrument := c.Query("instrument")
		category := c.Query("category")
		parameters := scrape.Parameters{
			Instrument: model.Instruments[instrument],
			Category:   model.Categories[category],
		}
		scrapedPages := scrape.ScrapePages(parameters)
		c.JSON(http.StatusOK, scrapedPages)
	})

	router.Run()
}
