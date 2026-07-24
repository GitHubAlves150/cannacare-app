"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getLots, createLot, getExpiringLots, Lot } from "@/lib/api/stock";

export default function LotsPage() {
  const [lots, setLots] = useState<Lot[]>([]);
  const [expiring, setExpiring] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    product_id: "",
    lot_number: "",
    quantity: "",
    expiration_date: "",
    supplier: "",
    purchase_date: "",
    purchase_price: "",
  });

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
        setLots(lotsRes.data.items || []);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      quantity: Number(formData.quantity),
      purchase_price: Number(formData.purchase_price) || 0,
    };

    const response = await createLot(data);
    if (response.success) {
      await fetchData();
      setShowForm(false);
      setFormData({
        product_id: "",
        lot_number: "",
        quantity: "",
        expiration_date: "",
        supplier: "",
        purchase_date: "",
        purchase_price: "",
      });
    } else {
      alert(response.error || "Erro ao adicionar lote");
    }
  };

  const getStatusBadge = (lot: Lot) => {
    if (lot.is_expired) {
      return { label: "Vencido", className: "bg-red-900/30 text-red-400 border border-red-700" };
    }
    if (lot.days_until_expire <= 30) {
      return { label: "Próximo ao vencimento", className: "bg-yellow-900/30 text-yellow-400 border border-yellow-700" };
    }
    return { label: "Válido", className: "bg-green-900/30 text-green-400 border border-green-700" };
  };

  if (loading) {
    return <div className="text-[#52b788] p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Lotes</h1>
          <p className="text-[#52b788]">Gerencie os lotes de produtos</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg"
        >
          {showForm ? "Cancelar" : "+ Entrada de Produto"}
        </button>
      </div>

      {/* Alertas */}
      {expiring.length > 0 && (
        <Card className="border-yellow-700 bg-yellow-900/20">
          <CardHeader>
            <CardTitle className="text-yellow-400">📅 Validade Próxima (30 dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {expiring.map((item, index) => (
                <li key={index} className="text-white text-sm">
                  {item.product_name} - Lote {item.lot_number}: {item.days_until_expire} dias
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Formulário */}
      {showForm && (
        <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
          <CardHeader>
            <CardTitle className="text-white">Adicionar Lote</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Produto</label>
                <input
                  type="text"
                  value={formData.product_id}
                  onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  placeholder="ID do produto"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#52b788] mb-1">Lote</label>
                  <input
                    type="text"
                    value={formData.lot_number}
                    onChange={(e) => setFormData({ ...formData, lot_number: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                    placeholder="LOTE-001"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#52b788] mb-1">Quantidade</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                    min={1}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Data de Validade</label>
                <input
                  type="date"
                  value={formData.expiration_date}
                  onChange={(e) => setFormData({ ...formData, expiration_date: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Fornecedor</label>
                <input
                  type="text"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#52b788] mb-1">Data de Compra</label>
                  <input
                    type="date"
                    value={formData.purchase_date}
                    onChange={(e) => setFormData({ ...formData, purchase_date: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#52b788] mb-1">Preço de Compra</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.purchase_price}
                    onChange={(e) => setFormData({ ...formData, purchase_price: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg"
                >
                  Adicionar Lote
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tabela de lotes */}
      <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-[#0d1f1a] border-b border-[#2d6a4f]">
              <tr>
                <th className="px-4 py-3 text-left text-[#52b788]">Produto</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Lote</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Qtd.</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Validade</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Fornecedor</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d6a4f]/30">
              {lots.map((lot) => {
                const status = getStatusBadge(lot);
                return (
                  <tr key={lot.id} className="hover:bg-[#2d6a4f]/20">
                    <td className="px-4 py-3 text-white">{lot.product_name}</td>
                    <td className="px-4 py-3 text-[#52b788]">{lot.lot_number}</td>
                    <td className="px-4 py-3 text-white">{lot.current_quantity}</td>
                    <td className="px-4 py-3 text-[#52b788]">
                      {new Date(lot.expiration_date).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-[#52b788]">{lot.supplier || "-"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
                        {status.label}
                      </span>
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