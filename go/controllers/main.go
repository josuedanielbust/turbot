package controllers

import "github.com/labstack/echo/v4"

type Controller interface {
	RegisterRoutes(e *echo.Echo) error
}

var controller Controller

func SetController(c Controller) {
	controller = c
}

func RegisterRoutes(e *echo.Echo) error {
	return controller.RegisterRoutes(e)
}
