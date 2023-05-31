package utils

import (
	"testing"
	"tonemato/pkg/model"
)

func TestGetCacheKeyByParams(t *testing.T) {

	var params map[string]model.TeaserParams = map[string]model.TeaserParams{
		"lfm-guitar-5": {
			Instrument: "guitar",
			Category:   "lookingForMusician",
			ZipCode:    "51149",
		},
	}

	for key, param := range params {
		cacheKey, _ := GetCacheKeyByParams(param)
		if cacheKey != key {
			t.Errorf("got %q, wanted %q", cacheKey, key)
		}
	}
}
