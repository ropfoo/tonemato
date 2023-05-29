package redis

import (
	"context"
	"strconv"
	"time"
	"tonemato/apps/ralts/utils"
	"tonemato/pkg/date"
)

func IsCacheStale() bool {
	ctx := context.Background()

	// get timestamp of last fetch
	latestTimestamp := GetCache(ctx, "timestamp")

	oneDay := time.Duration(time.Hour * 24)
	isTimestampValid, err := date.IsTimestampValid(latestTimestamp, oneDay)
	if err != nil {
		utils.Zap.Info("No valid timestamp found - assuming cache is stale \n error: " + err.Error())
		return true
	}
	utils.Zap.Info(
		"Found timestamp :" + latestTimestamp +
			" | is cache stale: " + strconv.FormatBool(!isTimestampValid))
	return !isTimestampValid
}
