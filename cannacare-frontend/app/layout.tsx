// ================================================================
// LAYOUT PRINCIPAL DA APLICAÇÃO
// ================================================================
// Este é o layout raiz que envolve todas as páginas.
// Define a estrutura HTML básica, fontes e metadados.
// ================================================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// ================================================================
// FONTE INTER
// ================================================================
// Carregada do Google Fonts pelo Next.js (otimização automática)
const inter = Inter({ subsets: ["latin"] });

// ================================================================
// METADADOS DA APLICAÇÃO
// ================================================================
// Usados para SEO, título da página, descrição, etc.
export const metadata: Metadata = {
  title: "CannaCare - Gestão de Pacientes",
  description: "Sistema de gestão para associações de cannabis medicinal",
};

// ================================================================
// COMPONENTE ROOT LAYOUT
// ================================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}