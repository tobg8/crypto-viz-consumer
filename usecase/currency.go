package usecase

import (
	"fmt"
	"log"

	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/repository"
)

type CurrencyUsecase interface {
	retrieveCurrencyFromListing(l common.ListingEvent) common.CurrencyDB
	postCurrency(c common.CurrencyDB) (string, error)
	updateCurrency(cID string, lID string, c common.CurrencyDB) error
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
		Name:       l.Name,
		ImageURL:   l.Image,
		Identifier: l.ID,
		Symbol:     l.Symbol,
	}
}

func (cu *currencyUsecase) postCurrency(c common.CurrencyDB) (string, error) {
	if c.Identifier == "" || c.ImageURL == "" || c.Name == "" || c.Symbol == "" {
		return "", fmt.Errorf("could not post, currency is empty")
	}

	cID, err := cu.currencyRepo.GetCurrencyBySymbol(c.Identifier)
	if err != nil {
		err := cu.currencyRepo.PostCurrency(c)
		if err != nil {
			return "", fmt.Errorf("could not insert currency: %v", c)
		}
		cID, _ = cu.currencyRepo.GetCurrencyBySymbol(c.Identifier)
		log.Printf("insert currency: %v. %v", cID, "☺️")
	}

	return cID, nil
}

func (cu *currencyUsecase) updateCurrency(cID string, lID string, c common.CurrencyDB) error {
	//  Je veux récupérer les listing associés à ma currency
	listings, err := cu.currencyRepo.GetCurrencyListings(cID)
	if err != nil {
		return fmt.Errorf("could not get currency listings: %v with listingID: %v", cID, lID)
	}

	//  je veux update ma currency avec son nouveau listing + ceux récupérés juste au dessus
	err = cu.currencyRepo.UpdateCurrency(cID, lID, listings, c)
	if err != nil {
		return fmt.Errorf("could not update currency: %v with listingID: %v", cID, lID)
	}
	return nil
}
