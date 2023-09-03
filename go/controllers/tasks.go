package controllers

import (
	"encoding/json"
	"go/back/database"
	"go/back/models"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

type TasksController struct {
	Controller
}

type taskResponse struct {
	CodeStatus int    `json:"status"`
	Message    string `json:"message"`
}

func NewTasksController() *TasksController {
	return &TasksController{}
}

func (c *TasksController) Create(ctx echo.Context) error {
	taskInstance := models.Tasks{
		UpdatedAt: time.Now(),
	}
	err := json.NewDecoder(ctx.Request().Body).Decode(&taskInstance)
	if err != nil {
		return err
	}

	createdTask, err := database.CreateTask(&taskInstance)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, err)
	}
	return ctx.JSON(http.StatusCreated, createdTask)
}

func (c *TasksController) GetAll(ctx echo.Context) error {
	tasks, err := database.GetTasks()
	if err != nil {
		return err
	}

	return ctx.JSON(http.StatusOK, tasks)
}

func (c *TasksController) GetById(ctx echo.Context) error {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		return err
	}

	task, err := database.GetTask(id)
	if err != nil {
		return err
	}

	return ctx.JSON(http.StatusOK, task)
}

func (c *TasksController) Update(ctx echo.Context) error {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		return err
	}

	taskInstance := models.Tasks{
		Id:        id,
		UpdatedAt: time.Now(),
	}
	err = json.NewDecoder(ctx.Request().Body).Decode(&taskInstance)
	if err != nil {
		return err
	}

	task, err := database.UpdateTask(&taskInstance)
	if err != nil {
		return err
	}

	return ctx.JSON(http.StatusOK, task)
}

func (c *TasksController) Delete(ctx echo.Context) error {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		return err
	}

	err = database.DeleteTask(id)
	if err != nil {
		return err
	}

	return ctx.JSON(
		http.StatusOK,
		taskResponse{
			CodeStatus: http.StatusOK,
			Message:    "Task deleted",
		},
	)
}

func (c *TasksController) RegisterRoutes(e *echo.Echo) error {
	e.POST("/tasks/", c.Create)
	e.GET("/tasks/", c.GetAll)
	e.GET("/tasks/:id", c.GetById)
	e.PATCH("/tasks/:id", c.Update)
	e.DELETE("/tasks/:id", c.Delete)
	return nil
}
