package main

import (
	"log"
	"net/http"
	"os"
	"tonemato/apps/drilbur/internal/scrape"
	"tonemato/pkg/model"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	if os.Getenv("IS_DOCKER") != "true" {
		err := godotenv.Load("../../.env")
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

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
