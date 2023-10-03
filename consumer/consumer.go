package consumer

import (
	"fmt"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

type KafkaConsumerClient struct {
	Consumer *kafka.Consumer
}

// Create consumer creates consumer
func CreateConsumer() (*KafkaConsumerClient, error) {
	c, err := kafka.NewConsumer(getKafkaConf())
	if err != nil {
		return nil, fmt.Errorf("failed to create consumer: %w", err)
	}

	return &KafkaConsumerClient{
		Consumer: c,
	}, nil
}
