package repository

import (
	"errors"
	"log"

	"github.com/tobg8/crypto-viz-consumer/common"
)

type ListingRepository interface {
	PostListing(c common.ListingDB, cID int64) (int64, error)
	// GetCurrencyID(cn string) (int64, error)
}

type listingRepository struct {
}

func NewListingRepository() ListingRepository {
	return &listingRepository{}
}

func (cr *listingRepository) PostListing(c common.ListingDB, cID int64) (int64, error) {
	// J'insère mon listing avec ma catégorieID associé
	log.Printf("post listing: %v", c.CurrentPrice)

	return 0, errors.New("not implemented")
}
