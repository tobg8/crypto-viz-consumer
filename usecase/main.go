package usecase

import (
	"log"

	"github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/pocketbase"
	"github.com/tobg8/crypto-viz-consumer/repository"
)

func InitUsecases(message *kafka.Message) error {
	topicName := common.RetrieveTopicKey(string(message.Key))

	pc := pocketbase.NewClient("http://67.205.163.103:8081")
	lr := repository.NewListingRepository(pc)
	cr := repository.NewCurrencyRepository(pc)
	ar := repository.NewArticleRepository(pc)

	lu := NewListingUsecase(lr)
	cu := NewCurrencyUsecase(cr)
	au := NewArticleUsecase(ar)

	switch topicName {
	case "articles":
		log.Print("articles usecase")
		article, err := au.transformEventToArticle(message.Value)
		if err != nil {
			log.Print(err)
		}
		linkedCurrencies, err := au.getCurrencies(article)
		if err != nil {
			log.Print(err)
		}
		articleDB := au.transformArticleForDB(article, linkedCurrencies)
		err = au.postArticle(articleDB)
		if err != nil {
			log.Print(err)
		}
		log.Printf("insert article: %v. %v", articleDB.Title, "☺️")
	case "listing":
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
			return err
		}

		// Je récupère forcement la currencyID - j'insère mon listing
		listingID, err := lu.postListing(listingDB, currencyID)
		if err != nil {
			return err
		}

		log.Printf("insert listing: %v. %v", listingID, "☺️")
		// si je success alors je veux update ma currency et y ajouter le listingID
		err = cu.updateCurrency(currencyID, listingID, currencyDB)
		if err != nil {
			// TODO Si je ne peux pas link mon listing et ma currency je supprime le listing
			return err
		}
		log.Printf("update currency: %v. %v", currencyID, "☺️")
	case "prices":
		log.Print("price usecase")
		log.Print("not implemented")
	default:
		log.Printf("could not process event key: %v", topicName)
	}
	return nil
}
