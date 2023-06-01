package main

import (
	"os"
	"tonemato/apps/ralts/api/controller"
	"tonemato/apps/ralts/api/middleware"
	"tonemato/apps/ralts/setup"

	"github.com/gin-gonic/gin"
)

func main() {
	setup.Init()

	app := gin.New()
	app.Use(middleware.Cors())

	app.GET("/", controller.TeasersController)
	app.GET("/invalidate-cache", controller.InvalidateController)

	app.Run(":" + os.Getenv("VITE_RALTS_PORT"))
}
