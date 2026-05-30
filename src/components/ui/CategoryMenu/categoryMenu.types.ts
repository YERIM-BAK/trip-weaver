import { LucideIcon } from "lucide-react";

export interface categoryItem {
  label: string;
  icon: LucideIcon;
  color: string;
  href: string;
  disabled?: boolean;
}
