package handler

import (
	"net/http"

	"GitHubAlves150/cannacare-app/cannacare/internal/application/usecase"
	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	CreateUserUC *usecase.CreateUser
}

func NewUserHandler(createUserUC *usecase.CreateUser) *UserHandler {
	return &UserHandler{CreateUserUC: createUserUC}
}

type createUserRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

func (h *UserHandler) CreateUser(c *gin.Context) {
	var req createUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	if req.Role == "" {
		req.Role = "admin"
	}

	if err := h.CreateUserUC.Execute(c.Request.Context(), req.Name, req.Email, req.Password, req.Role); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "user created"})
}
