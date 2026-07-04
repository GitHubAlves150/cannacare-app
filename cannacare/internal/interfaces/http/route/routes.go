package route

import (
	"GitHubAlves150/cannacare-app/cannacare/internal/interfaces/http/handler"
	"github.com/gin-gonic/gin"
)

func Register(r *gin.Engine, userHandler *handler.UserHandler, authHandler *handler.AuthHandler) {
	r.GET("/health", handler.Health)
	r.POST("/users", userHandler.CreateUser)
	r.POST("/login", authHandler.Login)
}
