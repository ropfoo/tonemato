package redis

import (
	"context"
	"fmt"
	"tonemato/apps/ralts/logger"
)

func GetCache(ctx context.Context, key string) string {
	fmt.Println("etf")
	result, err := Redis.Get(ctx, key).Result()
	if err != nil {
		logger.Zap.Error("Oh no much error!k")
		return ""
	}
	return result
}
