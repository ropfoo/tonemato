package utils

import (
	"errors"
	"tonemato/pkg/model"
)

// Returns cache key based on given parameters
func GetParamKey(teaserParams model.TeaserParams) (string, error) {
	var cacheKey string
	var regionKey = string(teaserParams.ZipCode[0])

	// check if instrument exists
	instrument, ok := model.Instruments[teaserParams.Instrument]
	if !ok {
		return "", errors.New("Instrument " + teaserParams.Instrument + " does not exist")
	}

	// check if category exists
	catergory, ok := model.Categories[teaserParams.Category]
	if !ok {
		return "", errors.New("Category " + teaserParams.Category + " does not exist.")
	}

	cacheKey = catergory.Name + "-" + instrument.Name + "-" + regionKey
	return cacheKey, nil
}
