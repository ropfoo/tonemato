package main

import (
	"drilbur/internal/scrape"
	"drilbur/pkg/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.LoadHTMLGlob("cmd/mock/html/*")

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

	router.GET("/mock/musicstore", func(c *gin.Context) {
		c.HTML(http.StatusOK, "musicstore.html", gin.H{
			"title": "🍅 Musicstore Mock",
		})
	})

	router.GET("/mock/backstagepro", func(c *gin.Context) {
		c.HTML(http.StatusOK, "backstagepro.html", gin.H{
			"title": "🍅 Backstagepro Mock",
		})
	})

	router.GET("/mock/musikersucht", func(c *gin.Context) {
		c.HTML(http.StatusOK, "musikersucht.html", gin.H{
			"title": "🍅 Musikersucht Mock",
		})
	})

	router.Run()
}
