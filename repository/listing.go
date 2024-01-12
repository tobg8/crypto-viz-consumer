package repository

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"sort"

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
	resp, err := cr.pc.QueryByKafkaID(kafkaID)
	if err != nil {
		return "", fmt.Errorf("could not query listing with kafkaID %v", kafkaID)
	}

	var respParsed common.ListingResponse
	if err := json.Unmarshal(resp, &respParsed); err != nil {
		return "", fmt.Errorf("could not marshal listing: %w", err)
	}

	sort.Slice(respParsed.Items, func(i, j int) bool {
		return respParsed.Items[i].Created > respParsed.Items[j].Created
	})

	if len(respParsed.Items) == 0 {
		return "", fmt.Errorf("listing does not exist")
	}

	return respParsed.Items[0].ID, nil
}
