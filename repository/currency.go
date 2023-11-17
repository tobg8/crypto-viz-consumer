package repository

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/pocketbase"
)

type CurrencyRepository interface {
	PostCurrency(c common.CurrencyDB) error
	GetCurrencyBySymbol(cn string) (string, error)
	UpdateCurrency(cID string, lID string, lIDs []string, c common.CurrencyDB) error
	GetCurrencyListings(cID string) ([]string, error)
}

type currencyRepository struct {
	pc *pocketbase.Client
}

func NewCurrencyRepository(pc *pocketbase.Client) CurrencyRepository {
	return &currencyRepository{
		pc: pc,
	}
}

func (cr *currencyRepository) PostCurrency(c common.CurrencyDB) error {
	err := cr.pc.Create("currency", c)
	if err != nil {
		return fmt.Errorf("could not insert currency: %v", c.Symbol)
	}

	return nil
}

func (cr *currencyRepository) GetCurrencyBySymbol(cn string) (string, error) {
	// Je récupère une currencyID via son name
	resp, err := cr.pc.QueryBySymbol(cn)
	if err != nil {
		return "", fmt.Errorf("could not query currency symbol: %v", cn)
	}
	var respParsed common.CurrencyDBResponse
	if err := json.Unmarshal(resp, &respParsed); err != nil {
		return "", fmt.Errorf("could not marshal currency: %v", string(resp))
	}
	if len(respParsed.Items) > 0 && respParsed.Items[0].Name != "" {
		return respParsed.Items[0].ID, nil
	}
	return "", errors.New("currency does not exist")
}

func (cr *currencyRepository) UpdateCurrency(cID string, lID string, lIDs []string, c common.CurrencyDB) error {
	// J'update la relation listing de ma currency avec mon listingID en ajoutant mon listingID
	// a l'array de listing de ma currency
	listingIDs := append(lIDs, lID)
	currency := common.CurrencyDB{
		ID:         c.ID,
		Name:       c.Name,
		ImageURL:   c.ImageURL,
		Identifier: c.Identifier,
		Symbol:     c.Symbol,
		Listing:    listingIDs,
	}
	err := cr.pc.Update("currency", cID, currency)
	if err != nil {
		return fmt.Errorf("could not update currency: %v with listing: %v", cID, lID)
	}
	return err
}

func (cr *currencyRepository) GetCurrencyListings(cID string) ([]string, error) {
	//  Je récupère ma currency via sa currencyID
	resp, err := cr.pc.QueryByID(cID)
	if err != nil {
		return nil, fmt.Errorf("could not query currency by id: %v", cID)
	}

	var respParsed common.CurrencyDBResponse
	if err := json.Unmarshal(resp, &respParsed); err != nil {
		return nil, fmt.Errorf("could not marshal currency: %v", string(resp))
	}

	return respParsed.Items[0].Listing, nil
}
