package main

import (
	"drilbur/internal/scrape"
	"drilbur/pkg/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/healthcheck", func(c *gin.Context) {
		c.JSON(http.StatusOK, map[string]string{
			"healthcheck": "✅",
		})
	})

	router.GET("/scrape", func(c *gin.Context) {
		var instrument string = c.Query("instrument")
		var category string = c.Query("category")
		parameters := scrape.Parameters{
			Instrument: model.Instruments[instrument],
			Category:   model.Categories[category],
		}
		scrapedSites := scrape.ScrapeSites(parameters)
		c.JSON(http.StatusOK, scrapedSites)
	})

	router.Run()
}
