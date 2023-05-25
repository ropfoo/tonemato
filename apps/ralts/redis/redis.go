package redis

import (
	"github.com/redis/go-redis/v9"
)

var Redis *redis.Client

func Init() {
	Redis = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})
}
