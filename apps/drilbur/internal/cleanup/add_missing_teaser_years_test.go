package cleanup

import (
	"reflect"
	"testing"
	"tonemato/apps/drilbur/internal/mock/teasers"
)

func TestAddMissingTeaserYears(t *testing.T) {
	unsortedTeasersWihtoutYear := teasers.CreateMockTeasersForMissingYearTest(teasers.TeasersWithMissingYear)
	sortedTeasersWithYear := teasers.CreateMockTeasersForMissingYearTest(teasers.SortedTeasersWithMissingYear)
	result := AddMissingTeaserYears(unsortedTeasersWihtoutYear)

	isEqual := reflect.DeepEqual(sortedTeasersWithYear, result)
	if !isEqual {
		t.Errorf("got %q, wanted %q", result, sortedTeasersWithYear)
	}
}
