package model

type Category struct {
	Name           string
	MusikersuchtID string
	MusicstoreID   string
}

var Categories map[string]Category = map[string]Category{
	"lookingForMusician": {
		Name:           "lfm",
		MusikersuchtID: "musician",
		MusicstoreID:   "msb",
	},
	"lookingForBand": {
		Name:           "lfb",
		MusikersuchtID: "band",
		MusicstoreID:   "bsm",
	},
}
