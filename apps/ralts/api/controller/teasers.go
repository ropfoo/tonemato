package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"tonemato/apps/ralts/redis"
	"tonemato/apps/ralts/utils"
	"tonemato/pkg/model"

	"github.com/gin-gonic/gin"
)

// get teasers from redis cache
func TeasersController(ctx *gin.Context) {
	parameters := model.TeaserParams{
		Instrument: ctx.Query("instrument"),
		Category:   ctx.Query("category"),
		ZipCode:    ctx.Query("zipCode"),
	}

	cacheKey, err := utils.GetParamKey(parameters)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// get teasers from redis cache based on query params
	cachedTeasersString := redis.GetCache(ctx.Request.Context(), cacheKey)

	var cachedTeasers []model.Teaser
	if err := json.Unmarshal([]byte(cachedTeasersString), &cachedTeasers); err != nil {
		fmt.Println(err)
	}

	ctx.JSON(http.StatusOK, cachedTeasers)
}
