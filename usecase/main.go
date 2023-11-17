package usecase

import (
	"fmt"
	"log"

	"github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/repository"
)

func InitUsecases(message *kafka.Message) error {
	topicName := common.RetrieveKey(string(message.Key))

	lr := repository.NewListingRepository()
	lu := NewListingUsecase(lr)
	cr := repository.NewCurrencyRepository()
	cu := NewCurrencyUsecase(cr)

	switch topicName {
	case "articles":
		log.Print("articles usecase")
		log.Print("not implemented")
	case "listing":
		log.Print("listing usecase")

		listing, err := lu.transformEventToListing(message.Value)
		if err != nil {
			log.Print(err)
		}

		// je veux découper le listing en currency et listing
		listingDB := lu.transformListingEventToListingDB(listing)
		currencyDB := cu.retrieveCurrencyFromListing(listing)

		// je veux insérer les currency
		currencyID, err := cu.postCurrency(currencyDB)
		if err != nil {
			return fmt.Errorf("could not insert currency: %v", currencyDB)
		}

		// Je récupère forcement la currencyID - j'insère mon listing
		listingID, err := lu.postListing(listingDB, currencyID)
		if err != nil {
			return fmt.Errorf("could not insert listing: %v", listingDB)
		}

		// si je success alors je veux update ma currency et y ajouter le listingID
		err = cu.updateCurrency(currencyID, listingID)
		if err != nil {
			// Si je ne peux pas link mon listing et ma currency je supprime le listing
			return fmt.Errorf("could not link currency: %v to listing: %v", currencyDB, listingDB)
		}
	case "prices":
		log.Print("price usecase")
		log.Print("not implemented")
	default:
		log.Printf("could not process event key: %v", topicName)
	}
	return nil
}
