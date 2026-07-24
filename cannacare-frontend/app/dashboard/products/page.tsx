"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  getProducts,
  createProduct,
  updateProduct,
  toggleProductStatus,
  getLowStock,
  Product,
} from "@/lib/api/products";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    unit_price: "",
    min_stock_alert: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, lowStockRes] = await Promise.all([
        getProducts(),
        getLowStock(),
      ]);
      if (productsRes.success) {
        setProducts(productsRes.data.items || []);
      }
      if (lowStockRes.success) {
        setLowStockItems(lowStockRes.data || []);
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
      unit_price: Number(formData.unit_price),
      min_stock_alert: Number(formData.min_stock_alert),
    };

    let response;
    if (editingProduct) {
      response = await updateProduct(editingProduct.id, data);
    } else {
      response = await createProduct(data);
    }

    if (response.success) {
      await fetchData();
      setShowForm(false);
      setEditingProduct(null);
      setFormData({ name: "", description: "", unit_price: "", min_stock_alert: "" });
    } else {
      alert(response.error || "Erro ao salvar produto");
    }
  };

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    const response = await toggleProductStatus(id, !isActive);
    if (response.success) {
      await fetchData();
    } else {
      alert(response.error || "Erro ao alterar status");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      unit_price: String(product.unit_price),
      min_stock_alert: String(product.min_stock_alert),
    });
    setShowForm(true);
  };

  if (loading) {
    return <div className="text-[#52b788] p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Produtos</h1>
          <p className="text-[#52b788]">Gerencie o catálogo de produtos</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setFormData({ name: "", description: "", unit_price: "", min_stock_alert: "" });
            setShowForm(!showForm);
          }}
          className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg"
        >
          {showForm ? "Cancelar" : "+ Novo Produto"}
        </button>
      </div>

      {/* Alerta de estoque baixo */}
      {lowStockItems.length > 0 && (
        <Card className="border-red-700 bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-red-400">⚠️ Estoque Baixo</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {lowStockItems.map((item, index) => (
                <li key={index} className="text-white text-sm">
                  {item.product_name}: {item.current_quantity} unidades (mínimo: {item.min_stock_alert})
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
            <CardTitle className="text-white">
              {editingProduct ? "Editar Produto" : "Novo Produto"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-[#2d6a4f]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Descrição</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-[#2d6a4f]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#52b788] mb-1">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.unit_price}
                    onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#52b788] mb-1">Estoque Mínimo</label>
                  <input
                    type="number"
                    value={formData.min_stock_alert}
                    onChange={(e) => setFormData({ ...formData, min_stock_alert: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg"
                >
                  {editingProduct ? "Atualizar" : "Cadastrar"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de produtos */}
      <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-[#0d1f1a] border-b border-[#2d6a4f]">
              <tr>
                <th className="px-4 py-3 text-left text-[#52b788]">Nome</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Preço</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Estoque Mínimo</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Status</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d6a4f]/30">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-[#2d6a4f]/20">
                  <td className="px-4 py-3 text-[#2d6a4f]">{product.name}</td>
                  <td className="px-4 py-3 text-[#52b788]">R$ {product.unit_price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-[#52b788]">{product.min_stock_alert}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.is_active
                        ? "bg-green-900/30 text-green-400 border border-green-700"
                        : "bg-red-900/30 text-red-400 border border-red-700"
                    }`}>
                      {product.is_active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white text-xs rounded-lg"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleToggleStatus(product.id, product.is_active)}
                        className={`px-3 py-1 text-white text-xs rounded-lg ${
                          product.is_active
                            ? "bg-red-700 hover:bg-red-600"
                            : "bg-green-700 hover:bg-green-600"
                        }`}
                      >
                        {product.is_active ? "Desativar" : "Ativar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}