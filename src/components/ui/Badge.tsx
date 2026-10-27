import type { ReactNode } from "react";

type BadgeTone = "neutral" | "success" | "warning" | "danger";

type BadgeProps = {
  tone?: BadgeTone;
  children: ReactNode;
};

const tones: Record<BadgeTone, string> = {
  neutral: "bg-border text-foreground",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/15 text-danger",
};

export default function Badge({ tone = "neutral", children }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}