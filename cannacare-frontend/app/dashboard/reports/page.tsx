"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  getPatientReport,
  getExpiredPrescriptionsReport,
  getTopDoctorsReport,
  getLowStockReport,
} from "@/lib/api/reports";

export default function ReportsPage() {
  const [patientReport, setPatientReport] = useState<any>(null);
  const [expiredPrescriptions, setExpiredPrescriptions] = useState<any[]>([]);
  const [topDoctors, setTopDoctors] = useState<any[]>([]);
  const [lowStock, setLowStock] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const [patientRes, expiredRes, doctorsRes, stockRes] = await Promise.all([
        getPatientReport(),
        getExpiredPrescriptionsReport(),
        getTopDoctorsReport(),
        getLowStockReport(),
      ]);

      if (patientRes.success) setPatientReport(patientRes.data);
      if (expiredRes.success) setExpiredPrescriptions(expiredRes.data || []);
      if (doctorsRes.success) setTopDoctors(doctorsRes.data || []);
      if (stockRes.success) setLowStock(stockRes.data || []);
    } catch (error) {
      console.error("Erro ao carregar relatórios", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-[#52b788] p-6">Carregando relatórios...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Relatórios</h1>
        <p className="text-[#52b788]">Visão consolidada do sistema</p>
      </div>

      {/* Relatório de Pacientes */}
      <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
        <CardHeader>
          <CardTitle className="text-white">📊 Pacientes</CardTitle>
        </CardHeader>
        <CardContent>
          {patientReport && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(patientReport).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {typeof value === "number" ? value : "-"}
                  </div>
                  <div className="text-xs text-[#52b788] capitalize">
                    {key.replace(/_/g, " ")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Receitas Vencidas */}
      <Card className="border-red-700 bg-red-900/20">
        <CardHeader>
          <CardTitle className="text-red-400">📋 Receitas Vencidas</CardTitle>
        </CardHeader>
        <CardContent>
          {expiredPrescriptions.length === 0 ? (
            <p className="text-[#52b788]">Nenhuma receita vencida.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">Paciente</th>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">Médico</th>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">Vencimento</th>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">Dias</th>
                  </tr>
                </thead>
                <tbody>
                  {expiredPrescriptions.map((item, index) => (
                    <tr key={index} className="border-t border-red-800/30">
                      <td className="px-4 py-2 text-white text-sm">{item.full_name}</td>
                      <td className="px-4 py-2 text-[#52b788] text-sm">{item.doctor_name}</td>
                      <td className="px-4 py-2 text-[#52b788] text-sm">
                        {new Date(item.expiration_date).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-4 py-2 text-red-400 text-sm">{item.days_expired} dias</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Médicos */}
      <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
        <CardHeader>
          <CardTitle className="text-white">👨‍⚕️ Médicos que Mais Prescrevem</CardTitle>
        </CardHeader>
        <CardContent>
          {topDoctors.length === 0 ? (
            <p className="text-[#52b788]">Nenhum dado disponível.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">Médico</th>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">CRM</th>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">Especialidade</th>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">Prescrições</th>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">Pacientes</th>
                  </tr>
                </thead>
                <tbody>
                  {topDoctors.map((doctor, index) => (
                    <tr key={index} className="border-t border-[#2d6a4f]/30">
                      <td className="px-4 py-2 text-white text-sm">{doctor.doctor_name}</td>
                      <td className="px-4 py-2 text-[#52b788] text-sm">{doctor.crm}</td>
                      <td className="px-4 py-2 text-[#52b788] text-sm">{doctor.specialty || "-"}</td>
                      <td className="px-4 py-2 text-white text-sm">{doctor.total_prescriptions}</td>
                      <td className="px-4 py-2 text-[#52b788] text-sm">{doctor.unique_patients}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estoque Baixo */}
      <Card className="border-yellow-700 bg-yellow-900/20">
        <CardHeader>
          <CardTitle className="text-yellow-400">🏪 Produtos com Estoque Baixo</CardTitle>
        </CardHeader>
        <CardContent>
          {lowStock.length === 0 ? (
            <p className="text-[#52b788]">Nenhum produto com estoque baixo.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">Produto</th>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">Lote</th>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">Qtd.</th>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">Mínimo</th>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">Faltam</th>
                    <th className="px-4 py-2 text-left text-[#52b788] text-sm">Validade</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStock.map((item, index) => (
                    <tr key={index} className="border-t border-yellow-800/30">
                      <td className="px-4 py-2 text-white text-sm">{item.product_name}</td>
                      <td className="px-4 py-2 text-[#52b788] text-sm">{item.lot_number}</td>
                      <td className="px-4 py-2 text-white text-sm">{item.current_quantity}</td>
                      <td className="px-4 py-2 text-[#52b788] text-sm">{item.min_stock_alert}</td>
                      <td className="px-4 py-2 text-yellow-400 text-sm">{item.missing_units}</td>
                      <td className="px-4 py-2 text-[#52b788] text-sm">
                        {new Date(item.expiration_date).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
