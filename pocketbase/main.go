package pocketbase

import (
	"errors"
	"fmt"

	"github.com/duke-git/lancet/v2/convertor"
	"github.com/go-resty/resty/v2"
	"golang.org/x/sync/singleflight"
)

var ErrInvalidResponse = errors.New("invalid response")

type Client struct {
	client *resty.Client

	url         string
	tokenSingle singleflight.Group
}

type (
	Params struct {
		Page    int
		Size    int
		Filters string
		Sort    string
	}
)

func NewClient(url string) *Client {
	client := resty.New()

	return &Client{
		client:      client,
		url:         url,
		tokenSingle: singleflight.Group{},
	}
}

func (c *Client) Update(collection string, id string, body any) error {
	request := c.client.R().
		SetHeader("Content-Type", "application/json").
		SetPathParam("collection", collection).
		SetBody(body)

	resp, err := request.Patch(c.url + "/api/collections/{collection}/records/" + id)
	if err != nil {
		return fmt.Errorf("[update] can't send update request to pocketbase, err %w", err)
	}

	if resp.IsError() {
		return fmt.Errorf("[update] pocketbase returned status: %d, msg: %s, body: %s,  err %w",
			resp.StatusCode(),
			resp.String(),
			string(resp.Body()),
			ErrInvalidResponse,
		)
	}

	return nil
}

func (c *Client) Create(collection string, body any) error {
	request := c.client.R().
		SetHeader("Content-Type", "application/json").
		SetPathParam("collection", collection).
		SetBody(body)

	resp, err := request.Post(c.url + "/api/collections/{collection}/records")
	if err != nil {
		return fmt.Errorf("[create] can't send update request to pocketbase, err %w", err)
	}

	if resp.IsError() {
		return fmt.Errorf("[create] pocketbase returned status: %d, msg: %s, err %w",
			resp.StatusCode(),
			resp.String(),
			ErrInvalidResponse,
		)
	}

	return nil
}

func (c *Client) Delete(collection string, id string) error {
	request := c.client.R().
		SetHeader("Content-Type", "application/json").
		SetPathParam("collection", collection).
		SetPathParam("id", id)

	resp, err := request.Delete(c.url + "/api/collections/{collection}/records/{id}")
	if err != nil {
		return fmt.Errorf("[delete] can't send update request to pocketbase, err %w", err)
	}

	if resp.IsError() {
		return fmt.Errorf("[delete] pocketbase returned status: %d, msg: %s, err %w",
			resp.StatusCode(),
			resp.String(),
			ErrInvalidResponse,
		)
	}

	return nil
}

func (c *Client) List(collection string, params Params) ([]byte, error) {
	request := c.client.R().
		SetHeader("Content-Type", "application/json").
		SetPathParam("collection", collection)

	if params.Page > 0 {
		request.SetQueryParam("page", convertor.ToString(params.Page))
	}
	if params.Size > 0 {
		request.SetQueryParam("perPage", convertor.ToString(params.Size))
	}
	if params.Filters != "" {
		request.SetQueryParam("filter", params.Filters)
	}
	if params.Sort != "" {
		request.SetQueryParam("sort", params.Sort)
	}

	resp, err := request.Get(c.url + "/api/collections/{collection}/records")
	if err != nil {
		return []byte{}, fmt.Errorf("[list] can't send update request to pocketbase, err %w", err)
	}

	if resp.IsError() {
		return []byte{}, fmt.Errorf("[list] pocketbase returned status: %d, msg: %s, err %w",
			resp.StatusCode(),
			resp.String(),
			ErrInvalidResponse,
		)
	}

	return resp.Body(), nil
}

func (c *Client) QueryBySymbol(cSymbol string) ([]byte, error) {
	request := c.client.R().
		SetHeader("Content-Type", "application/json")

	query := fmt.Sprintf("%s/api/collections/currency/records?filter=(identifier='%s')", c.url, cSymbol)
	resp, err := request.Get(query)
	if err != nil {
		return []byte{}, fmt.Errorf("[list] can't query by symbol to pocketbase, err %w", err)
	}

	if resp.IsError() {

		return []byte{}, fmt.Errorf("[list] pocketbase returned status: %d, msg: %s, err %w",
			resp.StatusCode(),
			resp.String(),
			ErrInvalidResponse,
		)
	}

	return resp.Body(), nil
}

func (c *Client) QueryByID(cID string) ([]byte, error) {
	request := c.client.R().
		SetHeader("Content-Type", "application/json")

	query := fmt.Sprintf("%s/api/collections/currency/records?filter=(id='%s')", c.url, cID)
	resp, err := request.Get(query)
	if err != nil {
		return []byte{}, fmt.Errorf("[list] can't send update request to pocketbase, err %w", err)
	}

	if resp.IsError() {
		return []byte{}, fmt.Errorf("[list] pocketbase returned status: %d, msg: %s, err %w",
			resp.StatusCode(),
			resp.String(),
			ErrInvalidResponse,
		)
	}

	return resp.Body(), nil
}

func (c *Client) QueryByKafkaID(lID string) ([]byte, error) {
	request := c.client.R().
		SetHeader("Content-Type", "application/json")

	query := fmt.Sprintf("%s/api/collections/listing/records?filter=(kafka_id='%v')", c.url, lID)
	resp, err := request.Get(query)
	if err != nil {
		return []byte{}, fmt.Errorf("[list] can't send update request to pocketbase, err %w", err)
	}

	if resp.IsError() {
		return []byte{}, fmt.Errorf("[list] pocketbase returned status: %d, msg: %s, err %w",
			resp.StatusCode(),
			resp.String(),
			ErrInvalidResponse,
		)
	}

	return resp.Body(), nil
}
