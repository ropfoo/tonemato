package main

import (
	"fmt"
	"net/http"
	"tonemato/pkg/model"

	"github.com/gin-gonic/gin"
)

func main() {
	teaser := model.Teaser{}
	fmt.Println("Hello from ralts!", teaser)

	app := gin.New()

	app.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, "hello from ralts")
	})

	app.Run(":8000")
}
