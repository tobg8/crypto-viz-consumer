package common

import (
	"strings"
)

func RetrieveTopicKey(s string) string {
	if s == "" {
		return ""
	}
	key := strings.Split(s, ":")
	return key[0]
}
