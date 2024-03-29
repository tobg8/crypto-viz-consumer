package usecase

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/repository"
)

type ListingUsecase interface {
	transformEventToListing(listing []byte) (common.ListingEvent, error)
	transformListingEventToListingDB(l common.ListingEvent) *common.ListingDB
	postListing(l common.ListingDB, cID string) (string, error)
}

type listingUsecase struct {
	listingRepo repository.ListingRepository
}

func NewListingUsecase(r repository.ListingRepository) ListingUsecase {
	return &listingUsecase{
		listingRepo: r,
	}
}

func (lu *listingUsecase) transformEventToListing(listing []byte) (common.ListingEvent, error) {
	var listingEvent common.ListingEvent
	err := json.Unmarshal(listing, &listingEvent)
	if err != nil {
		return common.ListingEvent{}, fmt.Errorf("could not convert listing: %v", string(listing))
	}
	return listingEvent, nil
}

func (lu *listingUsecase) transformListingEventToListingDB(l common.ListingEvent) *common.ListingDB {
	priceString := strconv.FormatFloat(l.CurrentPrice, 'g', 5, 64)
	kafkaID := strings.ReplaceAll(strings.ToLower(l.ID+l.Name+priceString), " ", "")
	return &common.ListingDB{
		CurrentPrice:                 l.CurrentPrice,
		MarketCap:                    l.MarketCap,
		MarketCapRank:                l.MarketCapRank,
		FullyDilutedValuation:        l.FullyDilutedValuation,
		TotalVolume:                  l.TotalVolume,
		High24H:                      l.High24H,
		Low24H:                       l.Low24H,
		PriceChange24H:               l.PriceChange24H,
		PriceChangePercentage24H:     l.PriceChangePercentage24H,
		MarketCapChange24H:           l.MarketCapChange24H,
		MarketCapChangePercentage24H: l.MarketCapChangePercentage24H,
		CirculatingSupply:            l.CirculatingSupply,
		TotalSupply:                  l.TotalSupply,
		MaxSupply:                    l.MaxSupply,
		Ath:                          l.Ath,
		AthChangePercentage:          l.AthChangePercentage,
		AthDate:                      l.AthDate,
		Atl:                          l.Atl,
		AtlChangePercentage:          l.AtlChangePercentage,
		AtlDate:                      l.AtlDate,
		KafkaID:                      kafkaID,
	}
}

func (lu *listingUsecase) postListing(l common.ListingDB, cID string) (string, error) {
	verifyListingInDB, err := lu.listingRepo.QueryListingByKafkaID(l.KafkaID)
	if err != nil {
		err = lu.listingRepo.PostListing(l, cID)
		if err != nil {
			return "", err
		}
	}

	if verifyListingInDB != "" {
		return verifyListingInDB, fmt.Errorf("already processed listing %v", verifyListingInDB)
	}

	listingID, err := lu.listingRepo.QueryListingByKafkaID(l.KafkaID)
	if err != nil {
		return "", err
	}

	return listingID, nil
}
