package consumer

import (
	"fmt"
	"os"

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

func getKafkaConf() *kafka.ConfigMap {
	topicUrl := os.Getenv("KAFKA_TOPIC_URL")
	username := os.Getenv("KAFKA_API_KEY")
	secret := os.Getenv("KAFKA_SECRET")

	return &kafka.ConfigMap{
		"bootstrap.servers": topicUrl,
		"security.protocol": "SASL_SSL",
		"sasl.mechanisms":   "PLAIN",
		"group.id":          "localhost",
		"sasl.username":     username,
		"sasl.password":     secret,
	}
}
