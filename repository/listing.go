package repository

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"

	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/pocketbase"
)

type ListingRepository interface {
	PostListing(c common.ListingDB, cID string) error
	QueryListingByKafkaID(kafkaID string) (string, error)
}

type listingRepository struct {
	pc *pocketbase.Client
}

func NewListingRepository(pc *pocketbase.Client) ListingRepository {
	return &listingRepository{
		pc: pc,
	}
}

func (cr *listingRepository) PostListing(c common.ListingDB, cID string) error {
	// J'insère mon listing avec ma catégorieID associé
	c.CurrencyID = cID
	err := cr.pc.Create("listing", c)
	if err != nil {
		log.Print(err)
		return errors.New("could not insert listing")
	}

	return nil
}

func (cr *listingRepository) QueryListingByKafkaID(kafkaID string) (string, error) {
	resp, err := cr.pc.QueryByAth(kafkaID)
	if err != nil {
		return "", fmt.Errorf("could not query listing with kafkaID %v", kafkaID)
	}

	var respParsed common.ListingResponse
	if err := json.Unmarshal(resp, &respParsed); err != nil {
		return "", fmt.Errorf("could not marshal listing: %w", err)
	}

	if len(respParsed.Items) > 0 && respParsed.Items[0].ID != "" {
		return respParsed.Items[0].ID, nil
	}

	if len(respParsed.Items) == 0 {
		return "", fmt.Errorf("listing does not exist")
	}

	return respParsed.Items[0].ID, nil
}
