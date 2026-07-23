interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-card rounded-xl shadow-lg border border-border ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }: CardProps) {
  return <div className="p-6 pb-0">{children}</div>;
}

export function CardTitle({ children, className = "" }: CardProps & { className?: string }) {
  return <h3 className={`text-lg font-semibold text-card-foreground ${className}`}>{children}</h3>;
}

export function CardContent({ children }: CardProps) {
  return <div className="p-6 pt-2">{children}</div>;
}

export function CardFooter({ children }: CardProps) {
  return <div className="p-6 pt-0 border-t border-border">{children}</div>;
}