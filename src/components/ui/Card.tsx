import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300",
        hover && "hover:shadow-lg hover:shadow-neutral-200/50 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
