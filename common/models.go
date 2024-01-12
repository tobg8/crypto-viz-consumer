package common

import "time"

type ArticleEvent struct {
	Kind        string          `json:"kind,omitempty"`
	Source      string          `json:"source,omitempty"`
	Title       string          `json:"title"`
	URL         string          `json:"url"`
	Currencies  []CurrencyEvent `json:"currencies"`
	PublishedAt time.Time       `json:"published_at"`
	CreatedAt   time.Time       `json:"created_at"`
}

type ArticleEventDB struct {
	Kind        string    `json:"kind,omitempty"`
	Source      string    `json:"source,omitempty"`
	Title       string    `json:"title"`
	URL         string    `json:"url"`
	Currencies  []string  `json:"currencies"`
	PublishedAt time.Time `json:"published_at"`
	CreatedAt   time.Time `json:"created_at"`
}

type CurrencyEvent struct {
	Code  string `json:"code"`
	Title string `json:"title"`
}

type ListingEvent struct {
	ID                           string    `json:"id"`
	Symbol                       string    `json:"symbol"`
	Name                         string    `json:"name"`
	Image                        string    `json:"image"`
	CurrentPrice                 float64   `json:"current_price"`
	MarketCap                    int64     `json:"market_cap"`
	MarketCapRank                float64   `json:"market_cap_rank"`
	FullyDilutedValuation        float64   `json:"fully_diluted_valuation"`
	TotalVolume                  float64   `json:"total_volume"`
	High24H                      float64   `json:"high_24h"`
	Low24H                       float64   `json:"low_24h"`
	PriceChange24H               float64   `json:"price_change_24h"`
	PriceChangePercentage24H     float64   `json:"price_change_percentage_24h"`
	MarketCapChange24H           float64   `json:"market_cap_change_24h"`
	MarketCapChangePercentage24H float64   `json:"market_cap_change_percentage_24h"`
	CirculatingSupply            float64   `json:"circulating_supply"`
	TotalSupply                  float64   `json:"total_supply"`
	MaxSupply                    float64   `json:"max_supply"`
	Ath                          float64   `json:"ath"`
	AthChangePercentage          float64   `json:"ath_change_percentage"`
	AthDate                      time.Time `json:"ath_date"`
	Atl                          float64   `json:"atl"`
	AtlChangePercentage          float64   `json:"atl_change_percentage"`
	AtlDate                      time.Time `json:"atl_date"`
	LastUpdated                  time.Time `json:"last_updated"`
}

type CurrencyDB struct {
	ID         string   `json:"id"`
	Name       string   `json:"name"`
	ImageURL   string   `json:"image_url"`
	Identifier string   `json:"identifier"`
	Symbol     string   `json:"symbol"`
	Listing    []string `json:"listing"`
}

type ListingDB struct {
	ID                           string    `json:"id"`
	CurrentPrice                 float64   `json:"current_price"`
	MarketCap                    int64     `json:"market_cap"`
	MarketCapRank                float64   `json:"market_cap_rank"`
	FullyDilutedValuation        float64   `json:"fully_diluted_valuation"`
	TotalVolume                  float64   `json:"total_volume"`
	High24H                      float64   `json:"high_24h"`
	Low24H                       float64   `json:"low_24h"`
	PriceChange24H               float64   `json:"price_change_24h"`
	PriceChangePercentage24H     float64   `json:"price_change_percentage_24h"`
	MarketCapChange24H           float64   `json:"market_cap_change_24h"`
	MarketCapChangePercentage24H float64   `json:"market_cap_change_percentage_24h"`
	CirculatingSupply            float64   `json:"circulating_supply"`
	TotalSupply                  float64   `json:"total_supply"`
	MaxSupply                    float64   `json:"max_supply"`
	Ath                          float64   `json:"ath"`
	AthChangePercentage          float64   `json:"ath_change_percentage"`
	AthDate                      time.Time `json:"ath_date"`
	Atl                          float64   `json:"atl"`
	AtlChangePercentage          float64   `json:"atl_change_percentage"`
	AtlDate                      time.Time `json:"atl_date"`
	CurrencyID                   string    `json:"currency_id"`
	KafkaID                      string    `json:"kafka_id"`
}

type Listing struct {
	ID                           string  `json:"id"`
	CurrentPrice                 float64 `json:"current_price"`
	MarketCap                    int64   `json:"market_cap"`
	MarketCapRank                float64 `json:"market_cap_rank"`
	FullyDilutedValuation        float64 `json:"fully_diluted_valuation"`
	TotalVolume                  float64 `json:"total_volume"`
	High24H                      float64 `json:"high_24h"`
	Low24H                       float64 `json:"low_24h"`
	PriceChange24H               float64 `json:"price_change_24h"`
	PriceChangePercentage24H     float64 `json:"price_change_percentage_24h"`
	MarketCapChange24H           float64 `json:"market_cap_change_24h"`
	MarketCapChangePercentage24H float64 `json:"market_cap_change_percentage_24h"`
	CirculatingSupply            float64 `json:"circulating_supply"`
	TotalSupply                  float64 `json:"total_supply"`
	MaxSupply                    float64 `json:"max_supply"`
	Ath                          float64 `json:"ath"`
	AthChangePercentage          float64 `json:"ath_change_percentage"`
	Atl                          float64 `json:"atl"`
	AtlChangePercentage          float64 `json:"atl_change_percentage"`
	CurrencyID                   string  `json:"currency_id"`
	Created                      string  `json:"created"`
	Updated                      string  `json:"updated"`
}

type CurrencyDBResponse struct {
	Items []CurrencyDB `json:"items"`
}

type CurrencyListingResponse struct {
	Items []ListingDB `json:"items"`
}

type ListingResponse struct {
	Items []Listing `json:"items"`
}

type PriceUnitEvent struct {
	Timestamp int64
	Value     float64
	Type      string
	Range     string
	Currency  string
}

type PriceEvent struct {
	Prices       []PriceUnitEvent `json:"prices"`
	MarketCaps   []PriceUnitEvent `json:"market_caps"`
	TotalVolumes []PriceUnitEvent `json:"total_volumes"`
}

type PriceDB struct {
	Value          float64 `json:"value"`
	Type           string  `json:"type"`
	Range          string  `json:"range"`
	Timestamp      int64   `json:"timestamp"`
	CurrencySymbol string
	CurrencyID     string `json:"currency"`
}
