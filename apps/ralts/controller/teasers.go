package controller

import (
	"net/http"
	"tonemato/apps/ralts/redis"

	"github.com/gin-gonic/gin"
)

// get teasers from redis cache
func Teasers(ctx *gin.Context) {
	cachedTeasers := redis.GetCache(ctx.Request.Context(), "raw")
	ctx.JSON(http.StatusOK, cachedTeasers)
}
