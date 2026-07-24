"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getLots, getExpiringLots } from "@/lib/api/stock";

export default function StockPage() {
  const [totalLots, setTotalLots] = useState(0);
  const [expiring, setExpiring] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [lotsRes, expiringRes] = await Promise.all([
        getLots(),
        getExpiringLots(),
      ]);
      if (lotsRes.success) {
        setTotalLots(lotsRes.data.total || 0);
      }
      if (expiringRes.success) {
        setExpiring(expiringRes.data || []);
      }
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-[#52b788] p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Estoque</h1>
        <p className="text-[#52b788]">Visão geral do estoque</p>
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[#52b788]">Total de Lotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{totalLots}</div>
          </CardContent>
        </Card>

        <Card className="border-yellow-700 bg-yellow-900/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-yellow-400">Vencendo em 30 dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{expiring.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Links rápidos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/dashboard/stock/lots">
          <Card className="border-[#2d6a4f] bg-[#1a3a2a] hover:bg-[#2d6a4f]/20 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-2xl mb-2">📦</div>
              <h3 className="text-white font-semibold">Gerenciar Lotes</h3>
              <p className="text-[#52b788] text-sm">Adicionar e listar lotes</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/stock/movements">
          <Card className="border-[#2d6a4f] bg-[#1a3a2a] hover:bg-[#2d6a4f]/20 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-semibold">Movimentações</h3>
              <p className="text-[#52b788] text-sm">Histórico de movimentações</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}