"use client";

import { useState } from "react";
import { Doctor } from "@/lib/api/doctors";

interface DoctorFormProps {
  doctor?: Doctor;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function DoctorForm({ doctor, onSubmit, onCancel }: DoctorFormProps) {
  const [formData, setFormData] = useState({
    name: doctor?.name || "",
    crm: doctor?.crm || "",
    crm_state: doctor?.crm_state || "",
    specialty: doctor?.specialty || "",
    phone: doctor?.phone || "",
    email: doctor?.email || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#52b788] mb-1">Nome</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white focus:ring-2 focus:ring-[#52b788] focus:border-transparent outline-none"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#52b788] mb-1">CRM</label>
          <input
            type="text"
            value={formData.crm}
            onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
            className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white focus:ring-2 focus:ring-[#52b788] focus:border-transparent outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#52b788] mb-1">UF</label>
          <input
            type="text"
            value={formData.crm_state}
            onChange={(e) => setFormData({ ...formData, crm_state: e.target.value.toUpperCase() })}
            className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white focus:ring-2 focus:ring-[#52b788] focus:border-transparent outline-none"
            placeholder="SP"
            maxLength={2}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#52b788] mb-1">Especialidade</label>
        <input
          type="text"
          value={formData.specialty}
          onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
          className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white focus:ring-2 focus:ring-[#52b788] focus:border-transparent outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#52b788] mb-1">Telefone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white focus:ring-2 focus:ring-[#52b788] focus:border-transparent outline-none"
          placeholder="(11) 99999-9999"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#52b788] mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white focus:ring-2 focus:ring-[#52b788] focus:border-transparent outline-none"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? "Salvando..." : doctor ? "Atualizar" : "Cadastrar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}