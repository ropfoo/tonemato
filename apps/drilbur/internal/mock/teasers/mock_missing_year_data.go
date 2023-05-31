package teasers

var TeasersWithMissingYear []MockMissingYearTeaserData = []MockMissingYearTeaserData{
	{
		Page:       3,
		DateString: "29.03.",
		Order:      1,
	},
	{
		Page:       3,
		DateString: "09.06.",
		Order:      2,
	},
	{
		Page:       1,
		DateString: "16.04.",
		Order:      1,
	},
	{
		Page:       1,
		DateString: "02.04.",
		Order:      2,
	},
	{
		Page:       2,
		DateString: "29.03.",
		Order:      1,
	},
	{
		Page:       2,
		DateString: "23.03.",
		Order:      2,
	},
}

var SortedTeasersWithMissingYear []MockMissingYearTeaserData = []MockMissingYearTeaserData{
	{
		Date:       "2023-04-16T00:00:00+02:00",
		Page:       1,
		DateString: "16.04.",
		Order:      1,
	},
	{
		Date:       "2023-04-02T00:00:00+02:00",
		Page:       1,
		DateString: "02.04.",
		Order:      2,
	},
	{
		Date:       "2023-03-29T00:00:00+02:00",
		Page:       2,
		DateString: "29.03.",
		Order:      1,
	},
	{
		Date:       "2023-03-23T00:00:00+01:00",
		Page:       2,
		DateString: "23.03.",
		Order:      2,
	},
	{
		Date:       "2023-03-29T00:00:00+02:00",
		Page:       3,
		DateString: "29.03.",
		Order:      1,
	},
	{
		Date:       "2022-06-09T00:00:00+02:00",
		Page:       3,
		DateString: "09.06.",
		Order:      2,
	},
}
