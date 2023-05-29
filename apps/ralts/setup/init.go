package setup

import (
	"log"
	"os"
	"tonemato/apps/ralts/redis"
	"tonemato/apps/ralts/utils"

	"github.com/joho/godotenv"
)

func Init() {
	// Load env
	if os.Getenv("IS_DOCKER") != "true" {
		err := godotenv.Load("../../.env")
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	// Init redis
	utils.Zap.Info("Starting ralts")
	redis.Init()

	// Update cache if it is stale
	if redis.IsCacheStale() {
		redis.UpdateRawData()
	}
}
