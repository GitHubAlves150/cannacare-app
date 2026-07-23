// ================================================================
// PÁGINA DE REGISTRO
// ================================================================
// Tela para novos usuários se cadastrarem no sistema.
// ================================================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { register } from "@/lib/api/auth";

export default function RegisterPage() {
  // ============================================================
  // ESTADOS DO FORMULÁRIO
  // ============================================================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // ============================================================
  // SUBMISSÃO DO FORMULÁRIO
  // ============================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validar senhas
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      // Chamar a API
      const response = await register({
        name,
        email,
        password,
        role: "paciente", // Role padrão
      });

      if (response.success) {
        setSuccess(true);
        // Redirecionar para o login após 2 segundos
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(response.error || "Erro ao criar conta");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-green-700 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">C</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-emerald-800 font-bold">Criar Conta</CardTitle>
          <p className="text-emerald-800 text-sm font-medium">Cadastre-se no CannaCare</p>        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* ==========================================================
            CAMPO NOME
            ========================================================== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors" placeholder="João Silva"
                required
                minLength={3}
              />
            </div>

            {/* ==========================================================
            CAMPO EMAIL
            ========================================================== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors" placeholder="seu@email.com"
                required
              />
            </div>

            {/* ==========================================================
            CAMPO SENHA
            ========================================================== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors" placeholder="•••••••• (mínimo 6 caracteres)"
                required
                minLength={6}
              />
            </div>

            {/* ==========================================================
            CAMPO CONFIRMAR SENHA
            ========================================================== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar senha
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors" placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {/* ==========================================================
            MENSAGEM DE ERRO
            ========================================================== */}
            {error && (
              <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {/* ==========================================================
            MENSAGEM DE SUCESSO
            ========================================================== */}
            {success && (
              <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-200">
                ✅ Conta criada com sucesso! Redirecionando para o login...
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            {/* ==========================================================
            BOTÃO DE CADASTRAR
            ========================================================== */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading || success}
            >
              {loading ? "Cadastrando..." : success ? "Conta criada!" : "Cadastrar"}
            </Button>

            {/* ==========================================================
            LINK PARA LOGIN
            ========================================================== */}
            <p className="text-sm text-gray-500">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-green-700 font-medium hover:underline">
                Faça login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}