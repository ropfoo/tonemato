package model

type Instrument struct {
	Name           string
	MusikersuchtID int
	MusicstoreID   int
	MukkenID       string
}

var Instruments map[string]Instrument = map[string]Instrument{
	"guitar": {
		Name:           "guitar",
		MusikersuchtID: 4,
		MusicstoreID:   5,
		MukkenID:       "r165",
	},
	"bass": {
		Name:           "bass",
		MusikersuchtID: 2,
		MusicstoreID:   6,
	},
}
