package usecase

import (
	"encoding/json"
	"fmt"

	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/repository"
)

type PriceUsecase interface {
	transformEventToPrices(listing []byte) ([]common.PriceDB, error)
	getLinkedCurrency(currencySymbol string) (string, error)
}

type priceUsecase struct {
	priceRepo repository.PriceRepository
}

func NewPriceUsecase(r repository.PriceRepository) PriceUsecase {
	return &priceUsecase{
		priceRepo: r,
	}
}

func (pu *priceUsecase) transformEventToPrices(prices []byte) ([]common.PriceDB, error) {
	var pricesDB []common.PriceDB
	var priceEvent common.PriceEvent

	err := json.Unmarshal(prices, &priceEvent)
	if err != nil {
		return nil, fmt.Errorf("could not convert prices: %w", err)
	}

	if len(priceEvent.Prices) == 0 {
		return nil, fmt.Errorf("no prices to send")
	}

	currencyID, err := pu.getLinkedCurrency(priceEvent.Prices[0].Currency)
	if err != nil {
		return nil, fmt.Errorf("could not find associated crypto: %v", priceEvent.Prices[0].Currency)

	}

	for _, v := range priceEvent.Prices {
		price := common.PriceDB{
			Value:          v.Value,
			Type:           v.Type,
			Range:          v.Range,
			Timestamp:      v.Timestamp,
			CurrencySymbol: v.Currency,
			CurrencyID:     currencyID,
		}

		pricesDB = append(pricesDB, price)
	}

	for _, v := range priceEvent.MarketCaps {
		marketCap := common.PriceDB{
			Value:          v.Value,
			Type:           v.Type,
			Range:          v.Range,
			Timestamp:      v.Timestamp,
			CurrencySymbol: v.Currency,
			CurrencyID:     currencyID,
		}

		pricesDB = append(pricesDB, marketCap)
	}

	for _, v := range priceEvent.TotalVolumes {
		totalVolume := common.PriceDB{
			Value:          v.Value,
			Type:           v.Type,
			Range:          v.Range,
			Timestamp:      v.Timestamp,
			CurrencySymbol: v.Currency,
			CurrencyID:     currencyID,
		}

		pricesDB = append(pricesDB, totalVolume)
	}

	return pricesDB, nil
}

func (pu *priceUsecase) getLinkedCurrency(currencySymbol string) (string, error) {
	currencyID, err := pu.priceRepo.GetCurrencyBySymbol(currencySymbol)
	if err != nil {
		return "", fmt.Errorf("could not find associated currency to insert: %v", currencySymbol)
	}
	return currencyID, nil
}
