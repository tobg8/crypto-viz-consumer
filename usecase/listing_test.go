package usecase

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"github.com/tobg8/crypto-viz-consumer/common"
	"github.com/tobg8/crypto-viz-consumer/repository"
)

type listingRepository struct {
	mock.Mock
}

func (lr *listingRepository) PostListing(c common.ListingDB, cID int64) (int64, error){
	args := lr.Called(c, cID)
	return args.Get(0).(int64), args.Error(1)
}

func TestNewListingUsecase(t *testing.T) {
	t.Run("nominal", func(t *testing.T) {
		in := repository.NewListingRepository()

		expect := &listingUsecase{listingRepo: in}

		out := NewListingUsecase(in)

		assert.Equal(t, expect, out)
	})
}

func TestTranformEventToListing(t *testing.T) {
	lr := new(listingRepository)
	lu := &listingUsecase{listingRepo: lr}
	t.Run("nominal", func(t *testing.T) {
		in := []byte(`
		{
				 "id": "stasis-eurs",
				 "symbol": "eurs",
				 "name": "STASIS EURO",
				 "image": "https://assets.coingecko.com/coins/images/5164/large/EURS_300x300.png?1696505680",
				 "current_price": 0.996814,
				 "market_cap": 124068448,
				 "market_cap_rank": 246,
				 "fully_diluted_valuation": 124068448,
				 "total_volume": 1466663,
				 "high_24h": 1.003,
				 "low_24h": 0.994252,
				 "price_change_24h": -0.004277135358176643,
				 "price_change_percentage_24h": -0.42725,
				 "market_cap_change_24h": -32178.334708333015,
				 "market_cap_change_percentage_24h": -0.02593,
				 "circulating_supply": 124125940,
				 "total_supply": 124125940,
				 "max_supply": 124125940,
				 "ath": 1.67,
				 "ath_change_percentage": -40.25233,
				 "ath_date": "2023-03-14T12:00:06.279Z",
				 "atl": 0.865257,
				 "atl_change_percentage": 15.46235,
				 "atl_date": "2021-05-19T13:14:32.592Z",
				 "last_updated": "2023-11-16T22:20:56.656Z"
	 }`)

	 	athDate, err := time.Parse("2006-01-02T15:04:05.999Z", "2023-03-14T12:00:06.279Z")
	 	require.NoError(t, err)
		atlDate, err := time.Parse("2006-01-02T15:04:05.999Z", "2021-05-19T13:14:32.592Z")
		require.NoError(t, err)
		lastUpdated, err := time.Parse("2006-01-02T15:04:05.999Z", "2023-11-16T22:20:56.656Z")
		require.NoError(t, err)

		expect := common.ListingEvent{
			ID: "stasis-eurs",
			Symbol: "eurs",
			Name: "STASIS EURO",
			Image: "https://assets.coingecko.com/coins/images/5164/large/EURS_300x300.png?1696505680",
			CurrentPrice: 0.996814,
			MarketCap: 124068448,
			MarketCapRank: 246,
			FullyDilutedValuation: 124068448,
			TotalVolume: 1466663,
			High24H: 1.003,
			Low24H: 0.994252,
			PriceChange24H: -0.004277135358176643,
			PriceChangePercentage24H: -0.42725,
			MarketCapChange24H: -32178.334708333015,
			MarketCapChangePercentage24H: -0.02593,
			CirculatingSupply: 124125940,
			TotalSupply: 124125940,
			MaxSupply: 124125940,
			Ath: 1.67,
			AthChangePercentage: -40.25233,
			AthDate: athDate,
			Atl: 0.865257,
			AtlChangePercentage: 15.46235,
			AtlDate: atlDate,
			LastUpdated: lastUpdated,
		}

		out, err := lu.transformEventToListing(in)
		assert.NoError(t, err)
		assert.Equal(t, expect, out)
	})
}


func TestTransformListingEventToListingDB(t *testing.T) {
	lr := new(listingRepository)
	lu := &listingUsecase{listingRepo: lr}
	t.Run("nominal", func(t *testing.T) {
		in := common.ListingEvent{
			CurrentPrice: 12,
			MarketCap: 182828,
			MarketCapRank: 1272.7,
			FullyDilutedValuation: 12828.77,
			TotalVolume: 122,
			High24H: 0.223,
			Low24H: -012.3,
			PriceChange24H: 12,
			PriceChangePercentage24H: 199,
			MarketCapChange24H: 100,
			MarketCapChangePercentage24H: 199.8,
			CirculatingSupply: 10,
			TotalSupply: 120,
			MaxSupply: 1,
			Ath: 10000,
			AthChangePercentage: 12.3,
			AthDate: time.Time{},
			Atl: 100,
			AtlChangePercentage: 01,
			AtlDate: time.Time{},
		}

		expect := common.ListingDB{
			CurrentPrice: 12,
			MarketCap: 182828,
			MarketCapRank: 1272.7,
			FullyDilutedValuation: 12828.77,
			TotalVolume: 122,
			High24H: 0.223,
			Low24H: -012.3,
			PriceChange24H: 12,
			PriceChangePercentage24H: 199,
			MarketCapChange24H: 100,
			MarketCapChangePercentage24H: 199.8,
			CirculatingSupply: 10,
			TotalSupply: 120,
			MaxSupply: 1,
			Ath: 10000,
			AthChangePercentage: 12.3,
			AthDate: time.Time{},
			Atl: 100,
			AtlChangePercentage: 01,
			AtlDate: time.Time{},
		}

		out := lu.transformListingEventToListingDB(in)
		assert.Equal(t, expect, out)
	})
}

func TestPostListing(t *testing.T) {
	t.Run("nominal", func(t *testing.T) {
		lr := new(listingRepository)
		lu := &listingUsecase{listingRepo: lr}

		post := common.ListingDB{
			CurrentPrice: 12,
			MarketCap: 182828,
			MarketCapRank: 1272.7,
			FullyDilutedValuation: 12828.77,
			TotalVolume: 122,
		}

		cID := int64(12)

		lr.On("PostListing", post, cID).Return(int64(12), nil)
		id, err := lu.postListing(post, cID)
		assert.NoError(t, err)
		assert.Equal(t, cID, id)
	})
}