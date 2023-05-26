package redis

import (
	"context"
	"encoding/json"
	"fmt"
	"tonemato/apps/ralts/organizer"
	"tonemato/pkg/model"
)

func UpdateRawData() {
	var collectedTeasers map[string][]model.Teaser = organizer.CollectTeasers()

	ctx := context.Background()
	for key, collection := range collectedTeasers {
		collectionBytes, err := json.Marshal(collection)
		if err != nil {
			fmt.Println(err)
		}
		SetCache(ctx, key, string(collectionBytes))
	}
}
