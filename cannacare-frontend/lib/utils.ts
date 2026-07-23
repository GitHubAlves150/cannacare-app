// ================================================================
// UTILITÁRIOS DA APLICAÇÃO
// ================================================================
// Funções auxiliares usadas em toda a aplicação
// ================================================================

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ================================================================
// FUNÇÃO cn() - Concatena classes CSS
// ================================================================
// Esta função combina classes CSS condicionalmente.
// Útil para componentes que recebem classes via props.
//
// EXEMPLO:
//   <button className={cn("bg-blue-500", isActive && "bg-green-500")}>
//     Botão
//   </button>
//
//   Se isActive = true → "bg-blue-500 bg-green-500" (sobrescreve)
//   Se isActive = false → "bg-blue-500"
// ================================================================
export function cn(...inputs: ClassValue[]) {
  // clsx: Concatena classes condicionalmente
  // twMerge: Mescla classes Tailwind evitando conflitos
  return twMerge(clsx(inputs));
}

// ================================================================
// FUNÇÃO formatDate() - Formata datas
// ================================================================
export function formatDate(date: Date | string): string {
  if (!date) return "-";
  
  const d = typeof date === "string" ? new Date(date) : date;
  
  // Verifica se a data é válida
  if (isNaN(d.getTime())) return "-";
  
  // Formata como: 15/05/2026 14:30
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// ================================================================
// FUNÇÃO formatCurrency() - Formata valores monetários (R$)
// ================================================================
export function formatCurrency(value: number): string {
  // Formata como: R$ 150,00
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// ================================================================
// FUNÇÃO getInitials() - Extrai iniciais de um nome
// ================================================================
export function getInitials(name: string): string {
  if (!name) return "?";
  
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  
  // Pega a primeira letra do primeiro nome e a primeira do último nome
  const first = parts[0].charAt(0);
  const last = parts[parts.length - 1].charAt(0);
  
  return (first + last).toUpperCase();
}