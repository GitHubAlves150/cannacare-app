// ================================================================
// FUNÇÕES DE AUTENTICAÇÃO
// ================================================================

import api from "./client";

// ================================================================
// INTERFACE DOS DADOS DE LOGIN
// ================================================================
export interface LoginData {
  email: string;
  password: string;
}

// ================================================================
// INTERFACE DOS DADOS DE REGISTRO
// ================================================================
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string; // opcional, padrão é "paciente"
}

// ================================================================
// INTERFACE DA RESPOSTA
// ================================================================
export interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
  error?: string;
}

// ================================================================
// FUNÇÃO DE LOGIN
// ================================================================
export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const response = await api.post("/api/auth/login", data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      error: "Erro de conexão com o servidor",
    } as AuthResponse;
  }
}

// ================================================================
// FUNÇÃO DE REGISTRO (NOVA)
// ================================================================
export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const response = await api.post("/api/auth/register", data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      error: "Erro de conexão com o servidor",
    } as AuthResponse;
  }
}