"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getSubscriptions, getOverdueSubscriptions } from "@/lib/api/financial";

export default function FinancialPage() {
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);
  const [overdue, setOverdue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subsRes, overdueRes] = await Promise.all([
        getSubscriptions(),
        getOverdueSubscriptions(),
      ]);
      if (subsRes.success) {
        setTotalSubscriptions(subsRes.data.total || 0);
      }
      if (overdueRes.success) {
        setOverdue(overdueRes.data || []);
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
        <h1 className="text-3xl font-bold text-white">Financeiro</h1>
        <p className="text-[#52b788]">Gerencie anuidades e pagamentos</p>
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[#52b788]">Total de Anuidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{totalSubscriptions}</div>
          </CardContent>
        </Card>

        <Card className="border-red-700 bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-red-400">Anuidades em Atraso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{overdue.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Links rápidos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/dashboard/financial/subscriptions">
          <Card className="border-[#2d6a4f] bg-[#1a3a2a] hover:bg-[#2d6a4f]/20 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-semibold">Anuidades</h3>
              <p className="text-[#52b788] text-sm">Gerenciar anuidades dos pacientes</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/financial/payments">
          <Card className="border-[#2d6a4f] bg-[#1a3a2a] hover:bg-[#2d6a4f]/20 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-semibold">Pagamentos</h3>
              <p className="text-[#52b788] text-sm">Histórico de pagamentos</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Anuidades em atraso */}
      {overdue.length > 0 && (
        <Card className="border-red-700 bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-red-400">⚠️ Anuidades em Atraso</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {overdue.map((item, index) => (
                <li key={index} className="text-white text-sm">
                  {item.full_name}: R$ {item.amount.toFixed(2)} - {item.days_overdue} dias em atraso
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}