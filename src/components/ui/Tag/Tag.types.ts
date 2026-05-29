export type TagColor =
  | "green"
  | "sky"
  | "peach"
  | "yellow"
  | "pink"
  | "purple"
  | "gray";

type tagSize = "sm" | "md";

export interface TagProps {
  children: React.ReactNode;
  color?: TagColor;
  size?: tagSize;
  icon?: React.ReactNode;
  className?: string;
}
