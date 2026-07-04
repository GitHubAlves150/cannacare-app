package handler

import (
	"net/http"

	"GitHubAlves150/cannacare-app/cannacare/internal/application/usecase"
	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	LoginUserUC *usecase.LoginUser
}

func NewAuthHandler(loginUserUC *usecase.LoginUser) *AuthHandler {
	return &AuthHandler{LoginUserUC: loginUserUC}
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req loginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	token, err := h.LoginUserUC.Execute(c.Request.Context(), req.Email, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}
