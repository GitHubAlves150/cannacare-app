// ================================================================
// COMPONENTE CARD
// ================================================================
// Um card reutilizável para organizar conteúdo.
// ================================================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// ================================================================
// COMPONENTE CARD (Container)
// ================================================================
export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-8 ${className}`}>
      {children}
    </div>
  );
}

// ================================================================
// CABEÇALHO DO CARD
// ================================================================
export function CardHeader({ children }: CardProps) {
  return <div className="mb-6">{children}</div>;
}

// ================================================================
// TÍTULO DO CARD
// ================================================================
export function CardTitle({ children, className = "" }: CardProps & { className?: string }) {
  return <h1 className={`text-3xl font-bold ${className}`}>{children}</h1>;
}

// ================================================================
// SUBTÍTULO DO CARD
// ================================================================
export function CardSubtitle({ children, className = "" }: CardProps & { className?: string }) {
  return <p className={`text-gray-500 ${className}`}>{children}</p>;
}

// ================================================================
// CONTEÚDO DO CARD
// ================================================================
export function CardContent({ children }: CardProps) {
  return <div>{children}</div>;
}

// ================================================================
// RODAPÉ DO CARD
// ================================================================
export function CardFooter({ children, className = "" }: CardProps & { className?: string }) {
  return <div className={`mt-6 pt-6 border-t border-gray-100 ${className}`}>{children}</div>;
}