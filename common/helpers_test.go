package common

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRetrieveKey(t *testing.T) {
	t.Run("nominal", func(t *testing.T) {
		in := "articles:supralol"
		expect := "articles"

		out := RetrieveKey(in)

		assert.Equal(t, expect, out)
	})
	t.Run("when key is invalid, return empty string", func(t *testing.T) {
		in := ""
		expect := ""

		out := RetrieveKey(in)

		assert.Equal(t, expect, out)
	})
}
