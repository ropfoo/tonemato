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

	router.LoadHTMLGlob("cmd/mock/*")

	router.GET("/", func(c *gin.Context) {

		lel := scrape.Start()

		c.JSON(http.StatusOK, gin.H{
			"hello": lel,
		})
	})

	router.GET("/mock", func(c *gin.Context) {
		c.HTML(http.StatusOK, "musikersucht.html", gin.H{
			"title": "Main website",
		})
	})

	router.Run()
}
