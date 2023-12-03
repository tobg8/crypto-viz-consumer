package repository

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"

	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/pocketbase"
)

type ArticleRepository interface {
	GetCurrencyBySymbol(string) (string, error)
	PostArticle(a common.ArticleEventDB) error
}

type articleRepository struct {
	pc *pocketbase.Client
}

func NewArticleRepository(pc *pocketbase.Client) ArticleRepository {
	return &articleRepository{
		pc: pc,
	}
}


func (ar *articleRepository) GetCurrencyBySymbol(symbol string) (string, error) {
	resp, err := ar.pc.QueryBySymbol(symbol)
	if err != nil {
		return "", errors.New("could not query currency")
	}
	var respParsed common.CurrencyDBResponse
	if err := json.Unmarshal(resp, &respParsed); err != nil {
		return "", fmt.Errorf("could not marshal currency: %w", err)
	}
	log.Print(symbol)

	if len(respParsed.Items) == 0 {
		return "", fmt.Errorf("currency does not exist")
	}


	return respParsed.Items[0].ID, nil
}

func (ar *articleRepository) PostArticle(a common.ArticleEventDB) error {
	// J'insère mon article
	err := ar.pc.Create("articles", a)
	if err != nil {
		log.Print(err)
		return  errors.New("could not insert article")
	}

	return  nil
}