package repository

import (
	"errors"

	"github.com/tobg8/crypto-viz-consumer/common"
)

type CurrencyRepository interface {
	PostCurrency(c common.CurrencyDB) (int64, error)
	GetCurrencyID(cn string) (int64, error)
	UpdateCurrency(cID int64, lID int64) error
}

type currencyRepository struct {

}

func NewCurrencyRepository() CurrencyRepository {
	return &currencyRepository{}
}

func (cr *currencyRepository) PostCurrency(c common.CurrencyDB) (int64, error) {
	// je récupère la currencyID, si elle existe pas je la crée

	// Si elle existe je retourne son ID
	return 0, errors.New("not implemented")
}

func (cr *currencyRepository) GetCurrencyID(cn string) (int64, error) {
	// Je récupère une currencyID via son name
	return 0, errors.New("not implemented")
}

func (cr *currencyRepository) UpdateCurrency(cID int64, lID int64) error {
	// Je récupère ma currency via sa currencyID
	// J'update la relation listing de ma currency avec mon listingID en ajoutant mon listingID
	// a l'array de listing de ma currency
	return errors.New("not implemented")
}