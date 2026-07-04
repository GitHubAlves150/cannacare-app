package http

import (
	"GitHubAlves150/cannacare-app/cannacare/internal/interfaces/http/handler"
	"GitHubAlves150/cannacare-app/cannacare/internal/interfaces/http/route"
	"github.com/gin-gonic/gin"
)

func SetupRouter(userHandler *handler.UserHandler, authHandler *handler.AuthHandler) *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery())
	route.Register(r, userHandler, authHandler)
	return r
}
