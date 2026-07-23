/** @type {import('next').NextConfig} */

// ================================================================
// CONFIGURAÇÕES DO NEXT.JS
// ================================================================
// O Next.js aceita apenas arquivos .js ou .mjs para configuração
// Não suporta .ts diretamente (a menos que use um plugin)
// ================================================================

const nextConfig = {
  // ============================================================
  // IMAGES - Configuração de imagens
  // ============================================================
  images: {
    domains: [
      'localhost',  // Para desenvolvimento local
    ],
  },

  // ============================================================
  // REWRITES - Proxy para API
  // ============================================================
  // Redireciona requisições /api/* para o backend
  // Isso evita problemas de CORS em desenvolvimento
  // ============================================================
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;