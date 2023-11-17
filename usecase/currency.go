package usecase

import (
	"fmt"

	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/repository"
)


type CurrencyUsecase interface {
	retrieveCurrencyFromListing(l common.ListingEvent) common.CurrencyDB
	postCurrency(c common.CurrencyDB) (int64, error)
	updateCurrency(cID int64, lID int64) error
}

type currencyUsecase struct {
	currencyRepo repository.CurrencyRepository
}

func NewCurrencyUsecase(r repository.CurrencyRepository) CurrencyUsecase {
	return &currencyUsecase{
		currencyRepo: r,
	}
}

func (cu *currencyUsecase) retrieveCurrencyFromListing(l common.ListingEvent) common.CurrencyDB {
	return common.CurrencyDB{
		Name: l.Name,
		ImageURL: l.Image,
		Identifier: l.ID,
		Symbol: l.Symbol,
	}
}

func (cu *currencyUsecase) postCurrency(c common.CurrencyDB) (int64, error) {
	if c.Identifier == "" || c.ImageURL == "" || c.Name == "" || c.Symbol == "" {
		return 0, fmt.Errorf("could not post, currency is empty")
	}
	currencyID, err := cu.currencyRepo.PostCurrency(c)
	if err != nil {
		return 0, fmt.Errorf("could not insert currency: %v", c)
	}
	return currencyID, err
}

func (cu *currencyUsecase) updateCurrency(cID int64, lID int64) error {
	err := cu.currencyRepo.UpdateCurrency(cID, lID)
	return err
}