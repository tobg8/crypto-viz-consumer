package usecase

import (
	"encoding/json"
	"fmt"

	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/repository"
)

type OhlcUsecase interface {
	transformEventToOhlc(ohlc []byte) ([]common.OhlcDBEvent, error)
	getLinkedCurrency(currencySymbol string) (string, error)
}

type ohlcUsecase struct {
	ohlcRepo repository.OhlcRepository
}

func NewOhlcUsecase(r repository.OhlcRepository) OhlcUsecase {
	return &ohlcUsecase{
		ohlcRepo: r,
	}
}

func (pu *ohlcUsecase) transformEventToOhlc(ohlc []byte) ([]common.OhlcDBEvent, error) {
	var ohlcDB []common.OhlcDBEvent
	var ohlcEvent common.OhlcEvent

	err := json.Unmarshal(ohlc, &ohlcEvent)
	if err != nil {
		return nil, fmt.Errorf("could not convert ohlc: %w", err)
	}

	if len(ohlcEvent.Ohlc) == 0 {
		return nil, fmt.Errorf("no ohlc to send")
	}

	currencyID, err := pu.getLinkedCurrency(ohlcEvent.Ohlc[0].CurrencySymbol)
	if err != nil {
		return nil, fmt.Errorf("could not find associated crypto: %v", ohlcEvent.Ohlc[0].CurrencySymbol)
	}

	for _, v := range ohlcEvent.Ohlc {
		ohlcEvent := common.OhlcDBEvent{
			Open:       v.Open,
			Range:      v.Range,
			Timestamp:  v.Timestamp,
			CurrencyID: currencyID,
			High:       v.High,
			Low:        v.Low,
			Close:      v.Close,
		}

		ohlcDB = append(ohlcDB, ohlcEvent)
	}

	return ohlcDB, nil
}

func (pu *ohlcUsecase) getLinkedCurrency(currencySymbol string) (string, error) {
	currencyID, err := pu.ohlcRepo.GetCurrencyBySymbol(currencySymbol)
	if err != nil {
		return "", fmt.Errorf("could not find associated currency to insert: %v", currencySymbol)
	}
	return currencyID, nil
}
