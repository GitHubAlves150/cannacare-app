package main

import (
	"log"

	
	"GitHubAlves150/cannacare-app/cannacare/internal/application/usecase"
	"GitHubAlves150/cannacare-app/cannacare/internal/config"
	"GitHubAlves150/cannacare-app/cannacare/internal/infrastructure/database"
	"GitHubAlves150/cannacare-app/cannacare/internal/infrastructure/repository"
	httpx "GitHubAlves150/cannacare-app/cannacare/internal/interfaces/http"
	"GitHubAlves150/cannacare-app/cannacare/internal/interfaces/http/handler"
)

func main() {
	cfg := config.Load()

	db, err := database.Connect(cfg)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	userRepo := repository.NewUserPostgresRepository(db)
	createUserUC := usecase.NewCreateUser(userRepo)
	loginUserUC := usecase.NewLoginUser(userRepo)

	userHandler := handler.NewUserHandler(createUserUC)
	authHandler := handler.NewAuthHandler(loginUserUC)

	r := httpx.SetupRouter(userHandler, authHandler)

	log.Fatal(r.Run(":" + cfg.AppPort))
}
