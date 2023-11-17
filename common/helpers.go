package common

import (
	"strings"
)

func RetrieveKey(s string) string {
	if s == "" {
		return ""
	}
	key := strings.Split(s, ":")
	return key[0]
}
