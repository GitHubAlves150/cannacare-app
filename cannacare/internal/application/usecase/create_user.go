package usecase

import (
	"context"
	"fmt"

	"GitHubAlves150/cannacare-app/cannacare/internal/domain/user"
	"GitHubAlves150/cannacare-app/cannacare/internal/infrastructure/auth"
	"github.com/google/uuid"
)

type CreateUser struct {
	Repo user.Repository
}

func NewCreateUser(repo user.Repository) *CreateUser {
	return &CreateUser{Repo: repo}
}

func (uc *CreateUser) Execute(ctx context.Context, name, email, password, role string) error {
	hashedPassword, err := auth.HashPassword(password)
	if err != nil {
		return fmt.Errorf("hash password: %w", err)
	}

	u := user.User{
		ID:       uuid.NewString(),
		Name:     name,
		Email:    email,
		Password: hashedPassword,
		Role:     role,
	}

	return uc.Repo.Create(ctx, u)
}
