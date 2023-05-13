package main

import (
	"drilbur/internal/scrape"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.LoadHTMLGlob("cmd/mock/html/*")

	router.GET("/", func(c *gin.Context) {
		musicstoreScrape := scrape.MusicstoreScrape{
			Config: scrape.Config{
				Url:   "http://localhost:8080/mock/musicstore",
				Entry: ".teaser",
			},
		}
		musicstoreTeasers := scrape.Init(&musicstoreScrape)

		c.JSON(http.StatusOK, gin.H{
			"musicstore": musicstoreTeasers,
		})

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
