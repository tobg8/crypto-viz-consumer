package repository

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/pocketbase"
)

type PriceRepository interface {
	PostPrice(c common.PriceDB) error
	GetCurrencyBySymbol(cn string) (string, error)
}

type priceRepository struct {
	pc *pocketbase.Client
}

func NewPriceRepository(pc *pocketbase.Client) PriceRepository {
	return &priceRepository{
		pc: pc,
	}
}

func (cr *priceRepository) PostPrice(c common.PriceDB) error {
	err := cr.pc.Create("prices", c)
	if err != nil {
		return fmt.Errorf("could not insert price: %v, %w", c.CurrencySymbol, err)
	}

	return nil
}

func (cr *priceRepository) GetCurrencyBySymbol(cn string) (string, error) {
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
