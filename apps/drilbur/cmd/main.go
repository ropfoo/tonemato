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
		musicstorePage := scrape.MusicstorePage{
			Config: scrape.Config{
				Url:          "http://localhost:8080/mock/musicstore",
				TeaserTarget: ".teaser",
			},
		}

		musikersuchtPage := scrape.MusikersuchtPage{
			Config: scrape.Config{
				Url:          "http://localhost:8080/mock/musikersucht",
				TeaserTarget: ".table-striped tr",
			},
		}

		musikersuchtTeasers := scrape.Teasers(&musikersuchtPage)
		musicstoreTeasers := scrape.Teasers(&musicstorePage)

		c.JSON(http.StatusOK, gin.H{
			"musikersucht": musikersuchtTeasers,
			"musicstore":   musicstoreTeasers,
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
