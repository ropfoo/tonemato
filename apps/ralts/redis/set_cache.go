package redis

import (
	"context"
	"fmt"
)

func SetCache(ctx context.Context, key string, value string) {
	err := Redis.Set(ctx, key, value, 0)
	if err != nil {
		fmt.Println(err)
	}
}
