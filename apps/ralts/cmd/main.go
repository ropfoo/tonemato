package main

import (
	"os"
	"tonemato/apps/ralts/controller"
	"tonemato/apps/ralts/middleware"
	"tonemato/apps/ralts/setup"

	"github.com/gin-gonic/gin"
)

func main() {
	setup.Init()

	app := gin.New()
	app.Use(middleware.Cors())

	app.GET("/", controller.Teasers)

	app.Run(":" + os.Getenv("VITE_RALTS_PORT"))
}
