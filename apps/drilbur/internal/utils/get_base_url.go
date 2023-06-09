package utils

import (
	"fmt"
	"os"
	"tonemato/pkg/model"
)

func GetBaseUrl(domain model.Domain) string {
	var mode string = os.Getenv("MODE")
	var isDevelopment bool = mode == "development"

	var mockDomain string = os.Getenv("CLOBBOPUS_DOMAIN")
	if os.Getenv("IS_DOCKER") == "true" {
		mockDomain = os.Getenv("CLOBBOPUS_DOMAIN_DOCKER")
	}
	var mockUrl string = mockDomain + ":" + os.Getenv("CLOBBOPUS_PORT")
	fmt.Println("Mock url:", mockUrl)

	switch domain {
	case "musikersucht":
		if isDevelopment {
			return mockUrl + "/musikersucht/requests/index"
		}
		return os.Getenv("MUSIKERSUCHT")
	case "musicstore":
		if isDevelopment {
			return mockUrl + "/musicstore/filter-ergebnisse"
		}
		return os.Getenv("MUSICSTORE")
	case "backstagepro":
		if isDevelopment {
			return mockUrl + "/backstagepro/musikersuche"
		}
		return os.Getenv("BACKSTAGEPRO")
	case "mukken":
		if isDevelopment {
			return mockUrl + "/mukken/de/searches"
		}
		return os.Getenv("MUKKEN")
	}
	return ""
}
