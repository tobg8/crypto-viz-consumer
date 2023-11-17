package usecase

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/repository"
)

type currencyRepository struct {
	mock.Mock
}

func (cr *currencyRepository) PostCurrency(c common.CurrencyDB) (int64, error) {
	args := cr.Called(c)
	return args.Get(0).(int64), args.Error(1)
}

func (cr *currencyRepository) GetCurrencyByName(cn string) (int64, error) {
	args := cr.Called(cn)
	return args.Get(0).(int64), args.Error(1)
}


func (cr *currencyRepository) UpdateCurrency(cID int64, lID int64) error {
	args := cr.Called(cID, lID)
	return args.Error(0)
}

func TestNewCurrencyUsecase(t *testing.T) {
	t.Run("nominal", func(t *testing.T) {
		in := repository.NewCurrencyRepository()

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
			Name: "name",
			Image:"super image",
			ID: "superid",
			Symbol:"SPR",
		}

		expect := common.CurrencyDB{
			Name: "name",
			ImageURL: "super image",
			Identifier: "superid",
			Symbol: "SPR",
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
			Name: "name",
			ImageURL: "super image",
			Identifier: "superid",
			Symbol: "SPR",
		}

		cr.On("PostCurrency", in).Return(int64(122), nil)
		id, err := lu.postCurrency(in)
		assert.NoError(t, err)
		assert.Equal(t, id, int64(122))
		cr.AssertExpectations(t)
	})

	t.Run("when currency is empty, return error", func(t *testing.T) {
		in := common.CurrencyDB{}
		id, err := lu.postCurrency(in)
		assert.Equal(t, id, int64(0))
		assert.Error(t, err)
		cr.AssertExpectations(t)
	})
}

func TestUpdateCurrency(t *testing.T) {
	cu := new(currencyRepository)
	lu := &currencyUsecase{currencyRepo: cu}

	t.Run("nominal", func(t *testing.T) {
		cID := int64(12)
		lID := int64(25)

		cu.On("UpdateCurrency", cID, lID).Return(nil)
		err := lu.updateCurrency(cID, lID)
		assert.NoError(t, err)
		cu.AssertExpectations(t)
	})
}