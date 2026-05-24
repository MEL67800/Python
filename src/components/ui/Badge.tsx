import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-neutral-100 text-neutral-700",
    outline: "border border-neutral-200 text-neutral-600",
  };

  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}
