package model

type Category struct {
	Name           string
	MusikersuchtID string
	MusicstoreIdID string
}

var Categories map[string]Category = map[string]Category{
	"lookingForMusician": {
		Name:           "looking for musician",
		MusikersuchtID: "musician",
		MusicstoreIdID: "msb",
	},
	"lookingForBand": {
		Name:           "looking for band",
		MusikersuchtID: "band",
		MusicstoreIdID: "bsm",
	},
}
