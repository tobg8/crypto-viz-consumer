package main

import (
	"fmt"
	"log"

	"github.com/joho/godotenv"
	"github.com/tobg8/crypto-viz-consumer/consumer"
	"github.com/tobg8/crypto-viz-consumer/usecase"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Initialize Kafka consumer
	kafkaConsumer, err := consumer.CreateConsumer()
	if err != nil {
		panic(fmt.Sprintf("Failed to create consumer: %s", err))
	}

	err = kafkaConsumer.Consumer.SubscribeTopics([]string{"articles", "listing", "prices", "ohlc"}, nil)
	if err != nil {
		log.Print(err)
	}

	// Start Kafka consumer
	run := true
	for run {
		message, err := kafkaConsumer.Consumer.ReadMessage(-1)
		if err != nil {
			log.Printf("Error reading Kafka message: %v", err)
			continue
		}
		if message == nil {
			continue
		}

		err = usecase.InitUsecases(message)
		if err != nil {
			log.Print(err)
			continue
		}
	}

	// Close Kafka consumer when done
	err = kafkaConsumer.Consumer.Close()
	if err != nil {
		return
	}
}
