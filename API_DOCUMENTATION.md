# API Documentation

</br>

## Trending Posts API

### Endpoint

```shell
ws://api/v1/trending-posts
```

### Description

The Trending Posts API provides real-time listings of articles. Connect to this WebSocket endpoint to receive updates on the latest trending articles. The data format includes essential information such as article ID, title, description, link, image URL, publication date, author, and categories.

### Expected Response Format :

```json
[
   {
      "data":{
         "id": string,
         "title": string,
         "description": string,
         "link": string,
         "image_url": string,
         "publication_date": string,
         "author": string,
         "categories": string[],
      }
   }
]
```

### Example Data :

```json
[
  {
    "data": {
      "id": "9a5ed249-8a1d-4852-b3f6-13645eb45244",
      "title": null,
      "description": "[[{\"content\":\"Promising signal is triggering again.\",\"type\":\"text\"}],[{\"content\":\"Monthly Money Flow Index (MFI) is passing 50 from below. \",\"type\":\"text\"}],[{\"content\":\"Every time when \",\"type\":\"text\"},{\"content\":{\"tag\":\"Bitcoin\"},\"type\":\"hashtag\"},{\"content\":\" \",\"type\":\"text\"},{\"content\":\"completes a cycle at top, MFI reaches the overbought zone and it comes down to a bottom throughout the bear market.\",\"type\":\"text\"}],[{\"content\":\"After the accumulation phase in the next cycle, \",\"type\":\"text\"},{\"content\":{\"id\":1,\"symbol\":\"BTC\",\"slug\":\"bitcoin\"},\"type\":\"token\"},{\"content\":\" starts a new bull run while MFI passes 50 from below.\",\"type\":\"text\"}],[{\"content\":\"On this monthly chart, we can see a new cycle began with MFI reaching the bottom. It is now passing 50, indicating a new bull run has started.\",\"type\":\"text\"}]]",
      "link": "https://cryptoslate.com/insights/record-low-speculation-reveals-bitcoin-market-maturing-in-silence/",
      "image_url": "https://pbs.twimg.com/media/F9Tml57akAEu_A3.jpg",
      "publication_date": "1682506723782",
      "author": "Trader Tardigrade",
      "categories": ["BITCOIN"]
    }
  }
]
```

</br>

## Cryptocurrency Listing API

### Endpoint

```shell
ws://api/v1/cryptocurrency/listing
```

### Description

The Cryptocurrency Listing API offers a WebSocket endpoint for retrieving a list of different cryptocurrencies. The response includes details such as cryptocurrency ID, name, symbol, tags, CoinMarketCap rank, market pair count, circulating supply, total supply, maximum supply, high in the last 24 hours, and low in the last 24 hours.

### Expected Response Format :

```json
{
    "cryptoCurrencyList": [
        {
            "id": UUID,
            "name": string,
            "symbol": string,
            "slug": string,
            "tags": string[],
            "cmcRank": number,
            "marketPairCount": number,
            "circulatingSupply": number,
            "totalSupply": number,
            "maxSupply": number,
            "high24h": number,
            "low24h": number,
        }
    ]
}
```

### Example Data :

```json
{
  "cryptoCurrencyList": [
    {
      "id": 1,
      "name": "Bitcoin",
      "symbol": "BTC",
      "slug": "bitcoin",
      "tags": ["mineable", "pow"],
      "cmcRank": 1,
      "marketPairCount": 10512,
      "circulatingSupply": 19524687,
      "totalSupply": 19524687,
      "maxSupply": 21000000,
      "high24h": 35133.75756928053,
      "low24h": 33875.77797864695,
      "": false
    }
  ]
}
```

</br>

## Crypto-Specific Trending Posts API

### Endpoint

```shell
ws://api/v1/cryptocurrency=ETH/trending-posts
```

### Description

The Crypto-Specific Trending Posts API allows you to retrieve a list of trending articles based on a specific cryptocurrency, such as Ethereum (ETH). Connect to this WebSocket endpoint to receive real-time updates on articles related to the specified cryptocurrency.

### Expected Response Format :

```json
[
   {
      "data":{
         "id": string,
         "title": string,
         "description": string,
         "link": string,
         "image_url": string,
         "publication_date": string,
         "author": string,
         "categories": string[],
      }
   }
]
```

</br>

## Cryptocurrency Detail Chart API

### Type of chart :

- Area chart
- HLC Bars Chart
- Pie chart

### Endpoint - Area chart

```shell
ws://api/v1/cryptocurrency/detail/chart?id=1&range=1D
```

### Description

The Cryptocurrency Detail Chart API provides historical data points for a specific cryptocurrency, allowing you to generate detailed charts. Use this RESTful API endpoint by specifying the cryptocurrency ID and the desired time range (e.g., 1D for the last 24 hours). The response includes data points with volume, market cap, and other relevant information.

```json
[
  {
    "points": {
      "1698251700": {
        "v": [
          34759.26963012127, 27841578708.31, 678629761033.2164, 1, 19523706
        ],
        "c": [34759.26963012127, 27841578708.31, 678629761033.2164]
      },
      "1698252000": {
        "v": [
          34625.39246426538, 27664528498.61, 676015982606.9327, 1, 19523706
        ],
        "c": [34625.39246426538, 27664528498.61, 676015982606.9327]
      },
      "1698252300": {
        "v": [34646.3572097202, 27690926117.89, 676425292133.5575, 1, 19523706],
        "c": [34646.3572097202, 27690926117.89, 676425292133.5575]
      }
    }
  }
]
```

### Endpoint - HLC Bars Chart

### Endpoint - Pie chart
