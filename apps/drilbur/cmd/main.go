package main

import (
	"drilbur/internal/scrape"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("Hello from the go based drilbur!!! wuhu! lets go stuff!")

	router := gin.Default()

	router.LoadHTMLGlob("cmd/mock/html/*")

	router.GET("/", func(c *gin.Context) {

		musikersucht := scrape.Start()

		c.JSON(http.StatusOK, gin.H{
			"musikersucht": musikersucht,
		})
	})

	router.GET("/mock/musikersucht", func(c *gin.Context) {
		c.HTML(http.StatusOK, "musikersucht.html", gin.H{
			"title": "🍅 Musikersucht Mock",
		})
	})

	router.GET("/mock/backstagepro", func(c *gin.Context) {
		c.HTML(http.StatusOK, "backstagepro.html", gin.H{
			"title": "🍅 Backstagepro Mock",
		})
	})

	router.Run()
}
