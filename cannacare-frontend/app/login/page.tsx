"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { login } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login({ email, password });

      if (response.success && response.data) {
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
      } else {
        setError(response.error || "Erro ao fazer login");
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
          <CardTitle className="text-2xl text-white">Entrar no Sistema</CardTitle>
          <p className="text-green-300 text-sm">Acesse sua conta CannaCare</p>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-900/30 text-red-300 text-sm p-3 rounded-lg border border-red-800/30">
                {error}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>

            <p className="text-sm text-green-300">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-green-400 font-medium hover:text-green-300">
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}