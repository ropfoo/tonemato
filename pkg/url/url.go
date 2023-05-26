package url

import "os"

func Drilbur(params string) string {
	return os.Getenv("DRILBUR_DOMAIN") + ":" + os.Getenv("DRILBUR_PORT") + params
}
