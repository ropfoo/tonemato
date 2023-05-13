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

		musicstore := scrape.Musicstore()

		c.JSON(http.StatusOK, gin.H{
			"musicstore": musicstore,
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
