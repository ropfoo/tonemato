package scrape

import (
	"regexp"
	"strings"
)

func PrettifyDescription(text string) string {
	re := regexp.MustCompile(`\r?\n`)

	descriptionWithoutLineBreaks := re.ReplaceAllString(text, " ")
	return strings.TrimSpace(
		strings.ReplaceAll(descriptionWithoutLineBreaks, "  ", ""),
	)
}
