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
        // --- SALVAR TOKEN EM COOKIE (para o middleware) ---
        document.cookie = `token=${response.data.token}; path=/; max-age=86400; SameSite=Lax`;
        
        // --- SALVAR TOKEN EM LOCALSTORAGE (para o cliente) ---
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
    <main className="min-h-screen flex items-center justify-center bg-[#1a3a2a] p-4">
      <Card className="max-w-md w-full border-[#2d6a4f] shadow-2xl shadow-black/20">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-[#2d6a4f] flex items-center justify-center shadow-lg shadow-green-900/30">
              <span className="text-2xl font-bold text-white">C</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-white tracking-tight">CannaCare</CardTitle>
          <p className="text-[#52b788] text-sm">Controle Clínico e de Estoque Multi-Tenant</p>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#52b788] mb-1">E-mail Corporativo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a3a2a] border border-[#2d6a4f] rounded-lg focus:ring-2 focus:ring-[#52b788] focus:border-transparent outline-none text-white placeholder:text-gray-500"
                placeholder="exemplo@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#52b788] mb-1">Senha de Acesso</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a3a2a] border border-[#2d6a4f] rounded-lg focus:ring-2 focus:ring-[#52b788] focus:border-transparent outline-none text-white placeholder:text-gray-500"
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <div className="bg-red-900/30 text-red-300 text-sm p-3 rounded-lg border border-red-800/30">{error}</div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" variant="primary" size="lg" className="w-full text-base font-semibold" disabled={loading}>
              {loading ? "Entrando..." : "Entrar no Sistema"}
            </Button>
            <p className="text-sm text-gray-400">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-[#52b788] font-medium hover:text-[#2d6a4f] transition-colors">
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}