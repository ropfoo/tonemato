package setup

import (
	"log"
	"os"
	"tonemato/apps/ralts/redis"

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
	redis.Init()
	redis.UpdateRawData()
}
