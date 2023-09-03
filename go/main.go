package main

import (
	"context"
	"errors"
	"flag"
	"go/back/server"
	"log"
	"os"

	"github.com/joho/godotenv"
)

var dev = flag.Bool("dev", true, "run in development mode")

func main() {
	flag.Parse()
	if *dev {
		err := godotenv.Load(".env")
		if err != nil {
			panic(errors.New("error loading .env.dev file"))
		}
	}

	PORT := os.Getenv("PORT")
	DATABASE_URL := os.Getenv("DATABASE_URL")

	s, err := server.NewServer(
		context.Background(),
		&server.Config{
			Port:        PORT,
			DatabaseURL: DATABASE_URL,
		},
	)
	if err != nil {
		log.Fatal(err)
	}

	s.Start(s.BindServer)
}
