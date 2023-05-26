package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"tonemato/apps/ralts/redis"
	"tonemato/pkg/model"

	"github.com/gin-gonic/gin"
)

// get teasers from redis cache
func Teasers(ctx *gin.Context) {
	var locationKey string = string(ctx.Query("zipCode")[0])
	// get teasers from redis cache based on query params
	cachedTeasersString := redis.GetCache(ctx.Request.Context(), locationKey)

	var cachedTeasers []model.Teaser
	if err := json.Unmarshal([]byte(cachedTeasersString), &cachedTeasers); err != nil {
		fmt.Println(err)
	}

	ctx.JSON(http.StatusOK, cachedTeasers)
}
