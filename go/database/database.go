package database

import (
	"go/back/models"
)

type Database interface {
	Close() error
	CreateTask(task *models.Tasks) (*models.Tasks, error)
	GetTasks() ([]*models.Tasks, error)
	GetTask(id int) (*models.Tasks, error)
	UpdateTask(task *models.Tasks) (*models.Tasks, error)
	DeleteTask(id int) error
}

var db Database

func Set(database Database) {
	db = database
}

func CreateTask(task *models.Tasks) (*models.Tasks, error) {
	return db.CreateTask(task)
}

func GetTasks() ([]*models.Tasks, error) {
	return db.GetTasks()
}

func GetTask(id int) (*models.Tasks, error) {
	return db.GetTask(id)
}

func UpdateTask(task *models.Tasks) (*models.Tasks, error) {
	return db.UpdateTask(task)
}

func DeleteTask(id int) error {
	return db.DeleteTask(id)
}
