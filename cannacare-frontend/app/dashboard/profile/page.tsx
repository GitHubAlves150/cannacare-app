"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getProfile, updateProfile, changePassword } from "@/lib/api/profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await getProfile();
      if (response.success) {
        setProfile(response.data);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
        });
      }
    } catch (error) {
      console.error("Erro ao carregar perfil", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const response = await updateProfile(formData);
    if (response.success) {
      setMessage({ type: "success", text: "Perfil atualizado com sucesso!" });
      setEditMode(false);
      await fetchProfile();
    } else {
      setMessage({ type: "error", text: response.error || "Erro ao atualizar perfil" });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (passwordData.new_password !== passwordData.confirm_password) {
      setMessage({ type: "error", text: "As senhas não coincidem" });
      return;
    }

    if (passwordData.new_password.length < 6) {
      setMessage({ type: "error", text: "A senha deve ter pelo menos 6 caracteres" });
      return;
    }

    const response = await changePassword({
      current_password: passwordData.current_password,
      new_password: passwordData.new_password,
    });

    if (response.success) {
      setMessage({ type: "success", text: "Senha alterada com sucesso!" });
      setPasswordMode(false);
      setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
    } else {
      setMessage({ type: "error", text: response.error || "Erro ao alterar senha" });
    }
  };

  const getRoleLabel = (role: string) => {
    const map: Record<string, string> = {
      admin: "Administrador",
      coordenacao: "Coordenação",
      secretaria: "Secretaria",
      acolhimento: "Acolhimento",
      farmacia: "Farmácia",
      paciente: "Paciente",
    };
    return map[role] || role;
  };

  if (loading) {
    return <div className="text-[#52b788] p-6">Carregando...</div>;
  }

  if (!profile) {
    return <div className="text-red-400 p-6">Erro ao carregar perfil</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Meu Perfil</h1>
        <p className="text-[#52b788]">Gerencie suas informações pessoais</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg ${
          message.type === "success"
            ? "bg-green-900/30 text-green-400 border border-green-700"
            : "bg-red-900/30 text-red-400 border border-red-700"
        }`}>
          {message.text}
        </div>
      )}

      {/* Informações do Perfil */}
      <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Informações Pessoais</CardTitle>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg text-sm"
            >
              Editar
            </button>
          )}
        </CardHeader>
        <CardContent>
          {editMode ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setFormData({ name: profile.name, email: profile.email });
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <div>
                <span className="text-[#52b788] text-sm">Nome</span>
                <p className="text-white">{profile.name}</p>
              </div>
              <div>
                <span className="text-[#52b788] text-sm">Email</span>
                <p className="text-white">{profile.email}</p>
              </div>
              <div>
                <span className="text-[#52b788] text-sm">Função</span>
                <p className="text-white">{getRoleLabel(profile.role)}</p>
              </div>
              <div>
                <span className="text-[#52b788] text-sm">Status</span>
                <p className="text-white">
                  {profile.is_active ? (
                    <span className="text-green-400">Ativo</span>
                  ) : (
                    <span className="text-red-400">Inativo</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alterar Senha */}
      <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Alterar Senha</CardTitle>
          {!passwordMode && (
            <button
              onClick={() => setPasswordMode(true)}
              className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg text-sm"
            >
              Alterar Senha
            </button>
          )}
        </CardHeader>
        <CardContent>
          {passwordMode ? (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Senha Atual</label>
                <input
                  type="password"
                  value={passwordData.current_password}
                  onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Nova Senha</label>
                <input
                  type="password"
                  value={passwordData.new_password}
                  onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  minLength={6}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={passwordData.confirm_password}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg"
                >
                  Alterar Senha
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPasswordMode(false);
                    setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <p className="text-[#52b788] text-sm">Clique em "Alterar Senha" para mudar sua senha.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}