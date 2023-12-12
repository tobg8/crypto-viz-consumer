package usecase

import (
	"log"
	"sync"

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
	pr := repository.NewPriceRepository(pc)

	lu := NewListingUsecase(lr)
	cu := NewCurrencyUsecase(cr)
	au := NewArticleUsecase(ar)
	pu := NewPriceUsecase(pr)

	switch topicName {
	case "articles":
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
		log.Printf("[ARTICLE]: %v. %v", articleDB.Title, "☺️")
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

		log.Printf("[LISTING]: %v. %v", listingID, "☺️")
		// si je success alors je veux update ma currency et y ajouter le listingID
		err = cu.updateCurrency(currencyID, listingID, currencyDB)
		if err != nil {
			// TODO Si je ne peux pas link mon listing et ma currency je supprime le listing
			return err
		}
		// log.Printf("[CURRENCY UPDATE]: %v. %v", currencyID, "☺️")
	case "price":
		prices, err := pu.transformEventToPrices(message.Value)
		if err != nil {
			return err
		}

		var wg sync.WaitGroup
		// Use a goroutine to  process prices
		ch := make(chan common.PriceDB, len(prices))

		for _, v := range prices {
			wg.Add(1)
			go func(price common.PriceDB) {
				defer wg.Done()

				// Insert the price into the database
				err := pr.PostPrice(price)
				if err != nil {
					log.Printf("Error inserting into the database: %v", err)
				}
				log.Printf("[PRICE] %v for range %v and type %v", price.CurrencySymbol, price.Range, price.Type)
			}(v)
		}

		go func() {
			wg.Wait()
			close(ch)
		}()

		wg.Wait()

		return nil

	default:
		log.Printf("could not process event key: %v", topicName)
	}
	return nil
}
