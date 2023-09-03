package server

import (
	"context"
	"errors"
	"fmt"
	"go/back/controllers"
	"go/back/database"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Config struct {
	Port        string
	DatabaseURL string
}

type Server interface {
	Config() *Config
	Database() *database.Database
}

type Proxy struct {
	config   *Config
	database *database.Database
}

func (p *Proxy) Config() *Config {
	return p.config
}

func (p *Proxy) Database() *database.Database {
	return p.database
}

func NewServer(ctx context.Context, config *Config) (*Proxy, error) {
	if config.Port == "" {
		return nil, errors.New("port is required")
	}

	if config.DatabaseURL == "" {
		return nil, errors.New("database url is required")
	}

	proxy := &Proxy{
		config: config,
	}

	return proxy, nil
}

func (p *Proxy) Start(func(s Server, e *echo.Echo)) error {
	e := echo.New()

	// Database
	pgdb, err := database.NewPostgres(p.config.DatabaseURL)
	if err != nil {
		return err
	}
	database.Set(pgdb)
	defer pgdb.Close()

	// Routes
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	p.BindServer(p, e)

	// Start server
	e.Logger.Fatal(e.Start(
		fmt.Sprintf(":%s", p.config.Port),
	))
	return nil
}

func (p *Proxy) BindServer(s Server, e *echo.Echo) {
	controllers.NewTasksController().RegisterRoutes(e)
}
