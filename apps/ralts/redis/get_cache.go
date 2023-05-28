package redis

import (
	"context"
	"tonemato/apps/ralts/logger"
)

func GetCache(ctx context.Context, key string) string {
	result, err := Redis.Get(ctx, key).Result()
	if err != nil {
		logger.Zap.Error("Unable to get cache by key: " + "'" + key + "'")
		return ""
	}
	return result
}
