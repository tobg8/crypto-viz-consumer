package usecase

import (
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/pocketbase"
	"github.com/tobg8/crypto-viz-consumer/repository"
)

type currencyRepository struct {
	mock.Mock
}

func (cr *currencyRepository) PostCurrency(c common.CurrencyDB) error {
	args := cr.Called(c)
	return args.Error(0)
}

func (cr *currencyRepository) GetCurrencyBySymbol(cn string) (string, error) {
	args := cr.Called(cn)
	return args.Get(0).(string), args.Error(1)
}

func (cr *currencyRepository) UpdateCurrency(cID string, lID string, lIDs []string, c common.CurrencyDB) error {
	args := cr.Called(cID, lID, lIDs, c)
	return args.Error(0)
}

func (cr *currencyRepository) GetCurrencyListings(cID string) ([]string, error) {
	args := cr.Called(cID)
	return args.Get(0).([]string), args.Error(1)
}

func TestNewCurrencyUsecase(t *testing.T) {
	pc := pocketbase.NewClient("")
	t.Run("nominal", func(t *testing.T) {
		in := repository.NewCurrencyRepository(pc)

		expect := &currencyUsecase{currencyRepo: in}

		out := NewCurrencyUsecase(in)

		assert.Equal(t, expect, out)
	})
}

func TestRetrieveCurrencyFromListing(t *testing.T) {
	cr := new(currencyRepository)
	lu := &currencyUsecase{currencyRepo: cr}

	t.Run("nominal", func(t *testing.T) {
		in := common.ListingEvent{
			Name:   "name",
			Image:  "super image",
			ID:     "superid",
			Symbol: "SPR",
		}

		expect := common.CurrencyDB{
			Name:       "name",
			ImageURL:   "super image",
			Identifier: "superid",
			Symbol:     "SPR",
		}

		out := lu.retrieveCurrencyFromListing(in)
		assert.Equal(t, expect, out)
	})
}

func TestPostCurrency(t *testing.T) {
	cr := new(currencyRepository)
	lu := &currencyUsecase{currencyRepo: cr}

	t.Run("nominal", func(t *testing.T) {
		in := common.CurrencyDB{
			Name:       "name",
			ImageURL:   "super image",
			Identifier: "superid",
			Symbol:     "SPR",
		}

		cr.On("GetCurrencyBySymbol", "superid").Return("azezaeazeazea", errors.New(""))
		cr.On("PostCurrency", in).Return(nil)

		id, err := lu.postCurrency(in)
		assert.NoError(t, err)
		assert.Equal(t, id, "azezaeazeazea")
		cr.AssertExpectations(t)
	})

	t.Run("when currency is empty, return error", func(t *testing.T) {
		in := common.CurrencyDB{}
		id, err := lu.postCurrency(in)
		assert.Equal(t, id, "")
		assert.Error(t, err)
		cr.AssertExpectations(t)
	})
}

func TestUpdateCurrency(t *testing.T) {
	cu := new(currencyRepository)
	lu := &currencyUsecase{currencyRepo: cu}

	t.Run("nominal", func(t *testing.T) {
		cID := "azeazeqsfqsfa"
		lID := "zaesfefd"

		c := common.CurrencyDB{}

		cu.On("GetCurrencyListings", cID).Return([]string{lID}, nil)
		cu.On("UpdateCurrency", cID, lID, []string{"zaesfefd"}, c).Return(nil)
		err := lu.updateCurrency(cID, lID, c)
		assert.NoError(t, err)
		cu.AssertExpectations(t)
	})
}
