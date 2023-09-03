package database

import (
	"database/sql"
	"fmt"
	"go/back/models"

	_ "github.com/lib/pq"
)

type Postgres struct {
	db *sql.DB
}

func NewPostgres(url string) (*Postgres, error) {
	db, err := sql.Open("postgres", url)
	if err != nil {
		return nil, err
	}
	return &Postgres{db: db}, nil
}

func (p *Postgres) Close() error {
	return p.db.Close()
}

func (p *Postgres) CreateTask(task *models.Tasks) (*models.Tasks, error) {
	taskId := 0
	err := p.db.QueryRow(
		`INSERT INTO tasks (title, completed, "updatedAt") VALUES ($1, $2, $3) returning id`,
		task.Title,
		task.Completed,
		task.UpdatedAt,
	).Scan(&taskId)
	if err != nil {
		return nil, err
	}

	row := p.db.QueryRow("SELECT * FROM tasks WHERE id = $1", taskId)
	task = &models.Tasks{}
	if err := row.Scan(&task.Id, &task.Title, &task.Completed, &task.CreatedAt, &task.UpdatedAt); err != nil {
		return nil, err
	}

	return task, nil
}

func (p *Postgres) GetTasks() ([]*models.Tasks, error) {
	rows, err := p.db.Query("SELECT * FROM tasks")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tasks []*models.Tasks
	for rows.Next() {
		task := &models.Tasks{}
		if err := rows.Scan(&task.Id, &task.Title, &task.Completed, &task.CreatedAt, &task.UpdatedAt); err != nil {
			return nil, err
		}
		tasks = append(tasks, task)
	}
	return tasks, nil
}

func (p *Postgres) GetTask(id int) (*models.Tasks, error) {
	row := p.db.QueryRow("SELECT * FROM tasks WHERE id = $1", id)
	task := &models.Tasks{}
	if err := row.Scan(&task.Id, &task.Title, &task.Completed, &task.CreatedAt, &task.UpdatedAt); err != nil {
		return nil, err
	}
	return task, nil
}

func (p *Postgres) UpdateTask(task *models.Tasks) (*models.Tasks, error) {
	query := "UPDATE tasks SET"
	if task.Title != "" {
		query += fmt.Sprintf(" title = '%s',", task.Title)
	}
	if task.Completed {
		query += fmt.Sprintf(" completed = %t,", task.Completed)
	}
	query += " \"updatedAt\" = $1 WHERE id = $2"

	_, err := p.db.Exec(
		query,
		task.UpdatedAt,
		task.Id,
	)
	if err != nil {
		return nil, err
	}

	row := p.db.QueryRow("SELECT * FROM tasks WHERE id = $1", task.Id)
	task = &models.Tasks{}
	if err := row.Scan(&task.Id, &task.Title, &task.Completed, &task.CreatedAt, &task.UpdatedAt); err != nil {
		return nil, err
	}

	return task, nil
}

func (p *Postgres) DeleteTask(id int) error {
	_, err := p.db.Exec("DELETE FROM tasks WHERE id = $1", id)
	return err
}
