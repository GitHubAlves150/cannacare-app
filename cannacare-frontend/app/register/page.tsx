"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { register } from "@/lib/api/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

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
      const response = await register({ name, email, password });

      if (response.success) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 2000);
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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 to-green-900 p-4">
      <Card className="max-w-md w-full border-green-800/30 shadow-2xl shadow-green-900/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-green-800 flex items-center justify-center shadow-lg shadow-green-900/30">
              <span className="text-2xl font-bold text-white">C</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-white">Criar Conta</CardTitle>
          <p className="text-green-300 text-sm">Cadastre-se no CannaCare</p>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-200 mb-1">Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-green-950/50 border border-green-800 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-white placeholder:text-green-400/50"
                placeholder="João Silva"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-200 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-green-950/50 border border-green-800 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-white placeholder:text-green-400/50"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-200 mb-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-green-950/50 border border-green-800 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-white placeholder:text-green-400/50"
                placeholder="•••••••• (mínimo 6 caracteres)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-200 mb-1">Confirmar senha</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 bg-green-950/50 border border-green-800 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-white placeholder:text-green-400/50"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-900/30 text-red-300 text-sm p-3 rounded-lg border border-red-800/30">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-emerald-900/30 text-emerald-300 text-sm p-3 rounded-lg border border-emerald-800/30">
                ✅ Conta criada com sucesso! Redirecionando...
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading || success}>
              {loading ? "Cadastrando..." : success ? "Conta criada!" : "Cadastrar"}
            </Button>

            <p className="text-sm text-green-300">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-green-400 font-medium hover:text-green-300">
                Faça login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}