package main

import (
	"drilbur/internal/scrape"
	"drilbur/pkg/model"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/healthcheck", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, map[string]string{
			"healthcheck": "✅",
			"mode":        os.Getenv("MODE"),
		})
	})

	router.GET("/scrape", func(ctx *gin.Context) {
		var instrument string = ctx.Query("instrument")
		var category string = ctx.Query("category")
		parameters := model.Parameters{
			Instrument: model.Instruments[instrument],
			Category:   model.Categories[category],
		}
		scrapedSites := scrape.ScrapeSites(parameters)
		ctx.JSON(http.StatusOK, scrapedSites)
	})

	router.Run()
}
