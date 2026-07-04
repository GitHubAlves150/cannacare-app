package repository

import (
	"context"
	"database/sql"

	"GitHubAlves150/cannacare-app/cannacare/internal/domain/user"
)

type UserPostgresRepository struct {
	DB *sql.DB
}

func NewUserPostgresRepository(db *sql.DB) *UserPostgresRepository {
	return &UserPostgresRepository{DB: db}
}

func (r *UserPostgresRepository) Create(ctx context.Context, u user.User) error {
	_, err := r.DB.ExecContext(ctx, `
		INSERT INTO users (id, name, email, password, role)
		VALUES ($1, $2, $3, $4, $5)
	`, u.ID, u.Name, u.Email, u.Password, u.Role)
	return err
}

func (r *UserPostgresRepository) FindByEmail(ctx context.Context, email string) (*user.User, error) {
	row := r.DB.QueryRowContext(ctx, `
		SELECT id, name, email, password, role
		FROM users
		WHERE email = $1
	`, email)

	var u user.User
	if err := row.Scan(&u.ID, &u.Name, &u.Email, &u.Password, &u.Role); err != nil {
		return nil, err
	}

	return &u, nil
}
