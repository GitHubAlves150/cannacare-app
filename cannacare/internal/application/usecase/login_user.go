package usecase

import (
	"context"

	"GitHubAlves150/cannacare-app/cannacare/internal/domain/user"
	"GitHubAlves150/cannacare-app/cannacare/internal/infrastructure/auth"
)

type LoginUser struct {
	Repo user.Repository
}

func NewLoginUser(repo user.Repository) *LoginUser {
	return &LoginUser{Repo: repo}
}

func (uc *LoginUser) Execute(ctx context.Context, email, password string) (string, error) {
	u, err := uc.Repo.FindByEmail(ctx, email)
	if err != nil {
		return "", err
	}

	if err := auth.CheckPassword(u.Password, password); err != nil {
		return "", err
	}

	return auth.GenerateToken(u.ID, u.Role)
}
