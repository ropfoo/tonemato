package redis

import (
	"context"
	"log"
)

func SetCache(ctx context.Context, key string, value string) {
	err := Redis.Set(ctx, key, value, 0)
	if err != nil {
		log.Fatal(err)
	}
}
