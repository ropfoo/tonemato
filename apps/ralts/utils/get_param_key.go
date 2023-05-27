package utils

import "tonemato/pkg/model"

func GetParamKey(teaserParams model.TeaserParams) string {
	var regionKey = string(teaserParams.ZipCode[0])
	return teaserParams.Category + "-" + teaserParams.Instrument + "-" + regionKey
}
