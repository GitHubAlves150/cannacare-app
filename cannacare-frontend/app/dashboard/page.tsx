"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getDashboardStats, DashboardStats } from "@/lib/api/dashboard";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError("Erro ao carregar dados do dashboard");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#52b788]">Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ==========================================================
      CABEÇALHO
      ========================================================== */}
      <div>
        <h2 className="text-3xl font-bold text-white">Visão Geral</h2>
        <p className="text-[#52b788]">Bem-vindo ao centro de gerenciamento da sua associação.</p>
      </div>

      {/* ==========================================================
      CARDS DE ESTATÍSTICAS
      ========================================================== */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-[#2d6a4f] bg-[#1a3a2a] shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[#52b788]">Pacientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-black">{stats?.patients?.approved || 0}</div>
            <p className="text-xs text-[#52b788]">
              {stats?.patients?.pending || 0} pendentes de aprovação
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#2d6a4f] bg-[#1a3a2a] shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[#52b788]">Prescrições Válidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-black">{stats?.prescriptions?.valid || 0}</div>
            <p className="text-xs text-[#52b788]">
              {stats?.prescriptions?.expired || 0} vencidas
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#2d6a4f] bg-[#1a3a2a] shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[#52b788]">Itens em Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#070707]">{stats?.stock?.total_items || 0}</div>
            <p className="text-xs text-red-400">
              {stats?.stock?.low_stock || 0} itens com estoque baixo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ==========================================================
      FILA REGULATÓRIA (será preenchida na próxima etapa)
      ========================================================== */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Fila Regulatória</h3>
        <p className="text-[#52b788] text-sm mb-4">
          Selecione um paciente na fila regulatória para auditar o prontuário.
        </p>

        <Card className="border-[#2d6a4f] bg-[#1a3a2a] shadow-xl shadow-black/20">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0d1f1a] border-b border-[#2d6a4f]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Paciente</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2d6a4f]/30">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-center text-[#52b788]">
                      Carregando pacientes pendentes...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ==========================================================
      AÇÕES RÁPIDAS
      ========================================================== */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Ações Rápidas do Sistema</h3>
        <p className="text-[#52b788] text-sm mb-4">
          Utilize o menu lateral para gerenciar os módulos operacionais.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg transition-all">
            ➕ Cadastrar Novo Paciente
          </button>
          <button className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg transition-all">
            🧪 Nova Dispensação de Óleo
          </button>
        </div>
      </div>
    </div>
  );
}