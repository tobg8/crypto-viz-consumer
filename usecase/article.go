package usecase

import (
	"encoding/json"
	"fmt"

	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/repository"
)

type ArticleUsecase interface {
	transformEventToArticle(listing []byte) (common.ArticleEvent, error)
	getCurrencies(common.ArticleEvent) ([]string, error)
	postArticle(common.ArticleEventDB) error
	transformArticleForDB(ae common.ArticleEvent, ids []string) common.ArticleEventDB
}

type articleUsecase struct {
	articleRepo repository.ArticleRepository
}

func NewArticleUsecase(r repository.ArticleRepository) ArticleUsecase {
	return &articleUsecase{
		articleRepo: r,
	}
}

func (ar *articleUsecase) transformEventToArticle(article []byte) (common.ArticleEvent, error) {
	var articleEvent common.ArticleEvent
	err := json.Unmarshal(article, &articleEvent)
	if err != nil {
		return common.ArticleEvent{}, fmt.Errorf("could not convert article: %w", err)
	}
	return articleEvent, nil
}

func (ar *articleUsecase) transformArticleForDB(ae common.ArticleEvent, ids []string) common.ArticleEventDB {
	return common.ArticleEventDB{
		Kind: ae.Kind,
		Source: ae.Source,
		Title: ae.Title,
		URL: ae.URL,
		Currencies: ids,
		PublishedAt: ae.PublishedAt,
		CreatedAt: ae.CreatedAt,
	}
}

func (ar *articleUsecase) getCurrencies(a common.ArticleEvent) ([]string, error) {
	var ids []string
	for _, v := range a.Currencies {
		id, err := ar.articleRepo.GetCurrencyBySymbol(v.Title)
		if err != nil {
			return  ids, fmt.Errorf("could not fetch currency for article: %w with currency: %v", err, a.Currencies)
		}
		ids = append(ids, id)
	}

	return ids ,nil
}


func (ar *articleUsecase) postArticle(article common.ArticleEventDB) error {
	err := ar.articleRepo.PostArticle(article)
	if err != nil {
		return err
	}

	return nil
}