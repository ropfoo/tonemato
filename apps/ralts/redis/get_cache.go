package redis

import (
	"context"
	"fmt"
	"log"
)

func GetCache(ctx context.Context, key string) string {
	fmt.Println("etf")
	result, err := Redis.Get(ctx, key).Result()
	if err != nil {
		log.Fatal(err)
		return ""
	}
	return result
}
