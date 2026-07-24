"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { getMovements, Movement } from "@/lib/api/stock";

export default function MovementsPage() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovements();
  }, []);

  const fetchMovements = async () => {
    setLoading(true);
    try {
      const response = await getMovements();
      if (response.success) {
        setMovements(response.data.items || []);
      }
    } catch (error) {
      console.error("Erro ao carregar movimentações", error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (type: string) => {
    const map: Record<string, { label: string; className: string }> = {
      entrada: { label: "Entrada", className: "bg-green-900/30 text-green-400 border border-green-700" },
      baixa_pedido: { label: "Baixa Pedido", className: "bg-blue-900/30 text-blue-400 border border-blue-700" },
      ajuste_manual: { label: "Ajuste Manual", className: "bg-yellow-900/30 text-yellow-400 border border-yellow-700" },
      perda: { label: "Perda", className: "bg-red-900/30 text-red-400 border border-red-700" },
    };
    return map[type] || { label: type, className: "bg-gray-900/30 text-gray-400 border border-gray-700" };
  };

  if (loading) {
    return <div className="text-[#52b788] p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Movimentações de Estoque</h1>
        <p className="text-[#52b788]">Histórico de todas as movimentações</p>
      </div>

      <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-[#0d1f1a] border-b border-[#2d6a4f]">
              <tr>
                <th className="px-4 py-3 text-left text-[#52b788]">Produto</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Lote</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Tipo</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Quantidade</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Anterior</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Novo</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d6a4f]/30">
              {movements.map((mov) => {
                const type = getTypeLabel(mov.type);
                return (
                  <tr key={mov.id} className="hover:bg-[#2d6a4f]/20">
                    <td className="px-4 py-3 text-white">{mov.product_name}</td>
                    <td className="px-4 py-3 text-[#52b788]">{mov.lot_number}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${type.className}`}>
                        {type.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white">{mov.quantity}</td>
                    <td className="px-4 py-3 text-[#52b788]">{mov.previous_quantity}</td>
                    <td className="px-4 py-3 text-[#52b788]">{mov.new_quantity}</td>
                    <td className="px-4 py-3 text-[#52b788]">
                      {new Date(mov.created_at).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}