type BorderRadius = "xs" | "sm" | "md" | "lg" | "xl";

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  rounded?: BorderRadius;
}
