package helper

import (
	"fmt"
	"strconv"
	"tonemato/pkg/model"
)

type SortByOrder []model.ScrapedTeaser

func (teasers SortByOrder) Len() int           { return len(teasers) }
func (teasers SortByOrder) Swap(i, j int)      { teasers[i], teasers[j] = teasers[j], teasers[i] }
func (teasers SortByOrder) Less(i, j int) bool { return teasers[i].Meta.Order < teasers[j].Meta.Order }

type SortByPage []model.ScrapedTeaser

func (teasers SortByPage) Len() int           { return len(teasers) }
func (teasers SortByPage) Swap(i, j int)      { teasers[i], teasers[j] = teasers[j], teasers[i] }
func (teasers SortByPage) Less(i, j int) bool { return teasers[i].Meta.Page < teasers[j].Meta.Page }

type SortByMonth []model.ScrapedTeaser

func (teasers SortByMonth) Len() int      { return len(teasers) }
func (teasers SortByMonth) Swap(i, j int) { teasers[i], teasers[j] = teasers[j], teasers[i] }
func (teasers SortByMonth) Less(i, j int) bool {
	numA, err := strconv.ParseFloat(teasers[i].Meta.DateString[3:5], 32)
	if err != nil {
		numA = 0
	}
	numB, err := strconv.ParseFloat(teasers[j].Meta.DateString[3:5], 32)
	if err != nil {
		fmt.Println(err.Error())
		numB = 0
	}
	fmt.Println(numA, teasers[j].Meta.DateString[:5], numB, teasers[i].Meta.DateString[:5])
	return numA > numB
}
