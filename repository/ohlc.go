package repository

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/pocketbase"
)

type OhlcRepository interface {
	PostOhlc(c common.OhlcDBEvent) error
	GetCurrencyBySymbol(cn string) (string, error)
}

type ohlcRepository struct {
	pc *pocketbase.Client
}

func NewOhlcRepository(pc *pocketbase.Client) OhlcRepository {
	return &ohlcRepository{
		pc: pc,
	}
}

func (cr *ohlcRepository) PostOhlc(c common.OhlcDBEvent) error {
	err := cr.pc.Create("ohlc", c)
	if err != nil {
		return fmt.Errorf("could not insert ohlc: %v, %w", c.CurrencyID, err)
	}

	return nil
}

func (cr *ohlcRepository) GetCurrencyBySymbol(cn string) (string, error) {
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
