package redis

import (
	"context"
	"encoding/json"
	"fmt"
	"tonemato/apps/ralts/organizer"
	"tonemato/pkg/model"
)

func UpdateRawData() {
	var collectedTeasers []model.Teaser = organizer.CollectTeasers()

	collectedTeasersBytes, err := json.Marshal(collectedTeasers)
	if err != nil {
		fmt.Println(err)
	}

	ctx := context.Background()
	SetCache(ctx, "raw", string(collectedTeasersBytes))
}
