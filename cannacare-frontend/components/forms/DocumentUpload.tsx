"use client";

import { useState } from "react";

interface DocumentUploadProps {
  patientId: string;
  onUpload: (documentType: string, file: File) => Promise<void>;
  onCancel: () => void;
}

const documentTypes = [
  { value: "rg_cpf", label: "RG/CPF" },
  { value: "comprovante_residencia", label: "Comprovante de Residência" },
  { value: "laudo_medico", label: "Laudo Médico" },
  { value: "receita_medica", label: "Receita Médica" },
  { value: "autorizacao_anvisa", label: "Autorização ANVISA" },
  { value: "termo_consentimento", label: "Termo de Consentimento" },
];

export function DocumentUpload({ patientId, onUpload, onCancel }: DocumentUploadProps) {
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentType) {
      setError("Selecione o tipo de documento");
      return;
    }
    if (!file) {
      setError("Selecione um arquivo");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await onUpload(documentType, file);
    } catch (err) {
      setError("Erro ao fazer upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#52b788] mb-1">Tipo de Documento</label>
        <select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white focus:ring-2 focus:ring-[#52b788] focus:border-transparent outline-none"
          required
        >
          <option value="">Selecione</option>
          {documentTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#52b788] mb-1">Arquivo</label>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
          className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#2d6a4f] file:text-white hover:file:bg-[#409f7a]"
          accept=".pdf,.jpg,.jpeg,.png"
          required
        />
        <p className="text-xs text-gray-400 mt-1">Formatos: PDF, JPG, PNG (máx. 10MB)</p>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar Documento"}
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