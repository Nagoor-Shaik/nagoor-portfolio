import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  brackets?: boolean;
  children: ReactNode;
};

export function GlassCard({ brackets = true, className, children, ...rest }: Props) {
  return (
    <div
      className={cn("glass-card p-6", brackets && "corner-brackets", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
