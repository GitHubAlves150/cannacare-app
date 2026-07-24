"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { createOrder } from "@/lib/api/orders";

export default function NewOrderPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    patient_id: "",
    prescription_id: "",
    items: [{ product_lot_id: "", quantity: 1, unit_price: 0 }],
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      ...formData,
      items: formData.items.map((item) => ({
        ...item,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
      })),
    };

    const response = await createOrder(data);
    if (response.success) {
      router.push("/dashboard/orders");
    } else {
      alert(response.error || "Erro ao criar pedido");
    }
    setLoading(false);
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product_lot_id: "", quantity: 1, unit_price: 0 }],
    });
  };

  const removeItem = (index: number) => {
    const items = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const items = [...formData.items];
    items[index] = { ...items[index], [field]: value };
    setFormData({ ...formData, items });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white">Novo Pedido</h1>
      <p className="text-[#52b788] mb-6">Crie um novo pedido para um paciente</p>

      <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#52b788] mb-1">Paciente</label>
              <input
                type="text"
                value={formData.patient_id}
                onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
                className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                placeholder="ID do paciente"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#52b788] mb-1">Prescrição</label>
              <input
                type="text"
                value={formData.prescription_id}
                onChange={(e) => setFormData({ ...formData, prescription_id: e.target.value })}
                className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                placeholder="ID da prescrição"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#52b788] mb-2">Itens</label>
              {formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                  <input
                    type="text"
                    value={item.product_lot_id}
                    onChange={(e) => updateItem(index, "product_lot_id", e.target.value)}
                    className="px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                    placeholder="Lote"
                    required
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", e.target.value)}
                    className="px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                    placeholder="Qtd"
                    min={1}
                    required
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.01"
                      value={item.unit_price}
                      onChange={(e) => updateItem(index, "unit_price", e.target.value)}
                      className="flex-1 px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                      placeholder="Preço"
                      required
                    />
                    {formData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="px-3 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-sm"
              >
                + Adicionar Item
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#52b788] mb-1">Observações</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                rows={3}
                placeholder="Observações do pedido"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg disabled:opacity-50"
              >
                {loading ? "Criando..." : "Criar Pedido"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}