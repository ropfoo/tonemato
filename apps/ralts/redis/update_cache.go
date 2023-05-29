package redis

import (
	"context"
	"encoding/json"
	"fmt"
	"time"
	"tonemato/apps/ralts/organizer"
	"tonemato/pkg/model"
)

func UpdateRawData() {
	var collectedTeasers map[string][]model.Teaser = organizer.CollectTeasers()

	ctx := context.Background()
	// set cache entry based on each collection key
	for key, collection := range collectedTeasers {
		collectionBytes, err := json.Marshal(collection)
		if err != nil {
			fmt.Println(err)
		}
		SetCache(ctx, key, string(collectionBytes))
	}
	// updated timestamp
	SetCache(ctx, "timestamp", time.Now().Format(time.RFC3339))
}
