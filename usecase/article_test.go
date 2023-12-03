package usecase

import (
	"errors"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/pocketbase"
	"github.com/tobg8/crypto-viz-consumer/repository"
)

type articleRepository struct {
	mock.Mock
}

func (ar *articleRepository) GetCurrencyBySymbol(s string) (string, error) {
	args := ar.Called(s)
	return args.Get(0).(string), args.Error(1)
}
func (ar *articleRepository) PostArticle(a common.ArticleEventDB) error {
	args := ar.Called(a)
	return args.Error(0)
}

func TestNewArticleUsecase(t *testing.T) {
	pc := pocketbase.NewClient("")
	t.Run("nominal", func(t *testing.T) {
		in := repository.NewArticleRepository(pc)

		expect := &articleUsecase{articleRepo: in}

		out := NewArticleUsecase(in)

		assert.Equal(t, expect, out)
	})
}

func TestTransformEventToArticle(t *testing.T) {
	ar := new(articleRepository)
	au := &articleUsecase{articleRepo: ar}

	t.Run("nominal without currencies", func(t *testing.T) {
		in := []byte(`
		{
			"kind": "super-kind",
			"source": "super-source",
			"title":"super-title",
			"url":"super-url",
			"published_at":"2021-05-19T13:14:32.592Z",
			"created_at": "2023-11-16T22:20:56.656Z"
		}`)
		publishedAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2021-05-19T13:14:32.592Z")
		require.NoError(t, err)
		createdAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2023-11-16T22:20:56.656Z")
		require.NoError(t, err)

		expect := common.ArticleEvent{
			Kind:        "super-kind",
			Source:      "super-source",
			Title:       "super-title",
			URL:         "super-url",
			PublishedAt: publishedAt,
			CreatedAt:   createdAt,
		}

		out, err := au.transformEventToArticle(in)
		assert.NoError(t, err)
		assert.Equal(t, expect, out)
	})

	t.Run("nominal with currencies", func(t *testing.T) {
		in := []byte(`
		{
			"kind": "super-kind",
			"source": "super-source",
			"title":"super-title",
			"url":"super-url",
			"currencies": [
				{
					"code": "super-code",
					"title": "super-title",
					"slug": "super-slug",
					"url": "super-url"
				}
			],
			"published_at":"2021-05-19T13:14:32.592Z",
			"created_at": "2023-11-16T22:20:56.656Z"
		}`)

		publishedAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2021-05-19T13:14:32.592Z")
		require.NoError(t, err)
		createdAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2023-11-16T22:20:56.656Z")
		require.NoError(t, err)
		expect := common.ArticleEvent{
			Kind:   "super-kind",
			Source: "super-source",
			Title:  "super-title",
			URL:    "super-url",
			Currencies: []common.CurrencyEvent{
				{
					Code:  "super-code",
					Title: "super-title",
				},
			},
			PublishedAt: publishedAt,
			CreatedAt:   createdAt,
		}

		out, err := au.transformEventToArticle(in)
		assert.NoError(t, err)
		assert.Equal(t, expect, out)
	})
}

func TestTransformArticleForDB(t *testing.T) {
	ar := new(articleRepository)
	au := &articleUsecase{articleRepo: ar}

	t.Run("nominal", func(t *testing.T) {
		publishedAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2021-05-19T13:14:32.592Z")
		require.NoError(t, err)
		createdAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2023-11-16T22:20:56.656Z")
		require.NoError(t, err)

		ids := []string{"1", "2", "3"}
		event := common.ArticleEvent{
			Kind:   "super-kind",
			Source: "super-source",
			Title:  "super-title",
			URL:    "super-url",
			Currencies: []common.CurrencyEvent{
				{
					Code:  "super-code",
					Title: "super-title",
				},
			},
			PublishedAt: publishedAt,
			CreatedAt:   createdAt,
		}

		expect := common.ArticleEventDB{
			Kind:        "super-kind",
			Source:      "super-source",
			Title:       "super-title",
			URL:         "super-url",
			Currencies:  ids,
			PublishedAt: publishedAt,
			CreatedAt:   createdAt,
		}

		out := au.transformArticleForDB(event, ids)
		assert.Equal(t, expect, out)
	})
}

func TestGetCurrencies(t *testing.T) {
	ar := new(articleRepository)
	au := &articleUsecase{articleRepo: ar}

	t.Run("when currency does not exist, return error", func(t *testing.T) {
		publishedAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2021-05-19T13:14:32.592Z")
		require.NoError(t, err)
		createdAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2023-11-16T22:20:56.656Z")
		require.NoError(t, err)

		in := common.ArticleEvent{
			Kind:   "super-kind",
			Source: "super-source",
			Title:  "super-title",
			URL:    "super-url",
			Currencies: []common.CurrencyEvent{
				{
					Code:  "stp",
					Title: "super-title",
				},
			},
			PublishedAt: publishedAt,
			CreatedAt:   createdAt,
		}

		ar.On("GetCurrencyBySymbol", in.Currencies[0].Title).Return("", errors.New("err"))

		out, err := au.getCurrencies(in)
		assert.Error(t, err)
		assert.Equal(t, []string(nil), out)
	})

	t.Run("nominal with currencies", func(t *testing.T) {
		publishedAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2021-05-19T13:14:32.592Z")
		require.NoError(t, err)
		createdAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2023-11-16T22:20:56.656Z")
		require.NoError(t, err)

		in := common.ArticleEvent{
			Kind:   "super-kind",
			Source: "super-source",
			Title:  "super-title",
			URL:    "super-url",
			Currencies: []common.CurrencyEvent{
				{
					Code:  "stp",
					Title: "super-title",
				},
				{
					Code:  "aot",
					Title: "anotherbtc",
				},
			},
			PublishedAt: publishedAt,
			CreatedAt:   createdAt,
		}

		ar.On("GetCurrencyBySymbol", in.Currencies[0].Title).Return("1", nil)
		ar.On("GetCurrencyBySymbol", in.Currencies[1].Title).Return("2", nil)
		expect := []string{"1", "2"}

		out, err := au.getCurrencies(in)
		assert.NoError(t, err)
		assert.Equal(t, expect, out)
	})

	t.Run("nominal without currencies", func(t *testing.T) {
		publishedAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2021-05-19T13:14:32.592Z")
		require.NoError(t, err)
		createdAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2023-11-16T22:20:56.656Z")
		require.NoError(t, err)

		in := common.ArticleEvent{
			Kind:        "super-kind",
			Source:      "super-source",
			Title:       "super-title",
			URL:         "super-url",
			Currencies:  []common.CurrencyEvent{},
			PublishedAt: publishedAt,
			CreatedAt:   createdAt,
		}

		expect := []string(nil)

		out, err := au.getCurrencies(in)
		assert.NoError(t, err)
		assert.Equal(t, expect, out)
	})
}

func TestPostArticle(t *testing.T) {
	ar := new(articleRepository)
	au := &articleUsecase{articleRepo: ar}

	t.Run("nominal", func(t *testing.T) {
		ids := []string{"1", "2"}

		publishedAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2021-05-19T13:14:32.592Z")
		require.NoError(t, err)
		createdAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2023-11-16T22:20:56.656Z")
		require.NoError(t, err)

		in := common.ArticleEventDB{
			Kind:        "super-kind",
			Source:      "super-source",
			Title:       "super-title",
			URL:         "super-url",
			Currencies:  ids,
			PublishedAt: publishedAt,
			CreatedAt:   createdAt,
		}

		ar.On("PostArticle", in).Return(nil)

		out := au.postArticle(in)
		assert.NoError(t, out)
	})

	t.Run("when repository error, return error", func(t *testing.T) {
		ids := []string{"1", "2"}

		publishedAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2021-05-19T13:14:32.592Z")
		require.NoError(t, err)
		createdAt, err := time.Parse("2006-01-02T15:04:05.999Z", "2023-11-16T22:20:56.656Z")
		require.NoError(t, err)

		in := common.ArticleEventDB{
			Kind:        "super-kind",
			Source:      "super-source",
			Title:       "super-title",
			URL:         "super-url",
			Currencies:  ids,
			PublishedAt: publishedAt,
			CreatedAt:   createdAt,
		}

		ar.On("PostArticle", in).Return(errors.New("err"))

		out := au.postArticle(in)
		assert.Error(t, out)
	})
}
