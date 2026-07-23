// ================================================================
// COMPONENTE BOTÃO
// ================================================================
// Um botão reutilizável com diferentes variantes e tamanhos.
// ================================================================

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

// ================================================================
// MAPA DE CORES POR VARIANTE
// ================================================================
const variants = {
  primary: "bg-green-700 hover:bg-green-800 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  outline: "border-2 border-green-700 text-green-700 hover:bg-green-50",
};

// ================================================================
// MAPA DE TAMANHOS
// ================================================================
const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

// ================================================================
// COMPONENTE PRINCIPAL
// ================================================================
export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-lg font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}