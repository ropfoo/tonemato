package controller

import (
	"net/http"
	"tonemato/apps/ralts/redis"

	"github.com/gin-gonic/gin"
)

func InvalidateController(ctx *gin.Context) {
	redis.SetCache(ctx.Request.Context(), "timestamp", "")
	ctx.JSON(http.StatusOK, gin.H{
		"message": "invalidated cache",
	})
}
