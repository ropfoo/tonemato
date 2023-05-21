package model

type Category struct {
	Name           string
	MusikersuchtID string
	MusicstoreID   string
}

var Categories map[string]Category = map[string]Category{
	"lookingForMusician": {
		Name:           "looking for musician",
		MusikersuchtID: "musician",
		MusicstoreID:   "msb",
	},
	"lookingForBand": {
		Name:           "looking for band",
		MusikersuchtID: "band",
		MusicstoreID:   "bsm",
	},
}
