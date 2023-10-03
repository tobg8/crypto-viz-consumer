package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/joho/godotenv"
	"github.com/r3labs/sse/v2"
	"github.com/tobg8/crypto-viz-consumer/consumer"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Initialize SSE server
	server := sse.New()
	server.CreateStream("messages")

	// Create a new Mux and set the handler
	mux := http.NewServeMux()
	mux.HandleFunc("/events", server.ServeHTTP)

	// Initialize Kafka consumer
	kafkaConsumer, err := consumer.CreateConsumer()
	if err != nil {
		panic(fmt.Sprintf("Failed to create consumer: %s", err))
	}

	err = kafkaConsumer.Consumer.SubscribeTopics([]string{"news"}, nil)
	if err != nil {
		log.Print(err)
	}

	// Handle http server in a separate go routine
	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		// Start HTTP server
		http.ListenAndServe(":8080", mux)
	}()

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
		server.Publish("messages", &sse.Event{
			Data: message.Value,
		})
	}

	// Close Kafka consumer when done
	kafkaConsumer.Consumer.Close()

	// Wait for the HTTP server Goroutine to finish
	wg.Wait()
}
