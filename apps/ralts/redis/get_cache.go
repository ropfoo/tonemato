package redis

import (
	"context"
	"tonemato/apps/ralts/utils"
)

func GetCache(ctx context.Context, key string) string {
	result, err := Redis.Get(ctx, key).Result()
	if err != nil {
		utils.Zap.Error("Unable to get cache by key: " + "'" + key + "'")
		return ""
	}
	return result
}
