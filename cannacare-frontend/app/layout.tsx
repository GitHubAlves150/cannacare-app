import type { Metadata } from "next";
import { Inter } from "next/font/google";
//import "./globals.css";  // ← Este import agora deve funcionar
// @ts-ignore: CSS side-effect import declaration
import "./globals.css";


// ================================================================
// FONTE INTER
// ================================================================
// A fonte Inter é carregada do Google Fonts pelo Next.js.
// Isso é uma otimização automática de performance.
// ================================================================
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ================================================================
// METADADOS
// ================================================================
// Metadados são usados para SEO, título, descrição,
// favicon, etc. Eles são injetados no <head> da página.
// ================================================================
export const metadata: Metadata = {
  title: {
    default: "CannaCare - Gestão de Pacientes",
    template: "%s | CannaCare",
  },
  description: "Sistema de gestão para associações de cannabis medicinal",
  keywords: ["cannabis", "cbd", "pacientes", "associação", "saúde"],
  authors: [{ name: "CannaCare" }],
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}