// ================================================================
// CLIENTE DA API
// ================================================================
// Configuração do Axios para comunicação com o backend.
// ================================================================

import axios from "axios";

// ================================================================
// INSTÂNCIA DO AXIOS
// ================================================================
// Base URL definida nas variáveis de ambiente.
// ================================================================
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// ================================================================
// INTERCEPTOR PARA ADICIONAR TOKEN
// ================================================================
// Toda requisição envia o token JWT se existir.
// ================================================================
api.interceptors.request.use((config) => {
  // Buscar token do localStorage (apenas no lado do cliente)
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;