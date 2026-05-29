import clsx from "clsx";
import styles from "./Skeleton.module.scss";
import { SkeletonProps } from "./Skeleton.types";

const Skeleton = ({ width, height, className, rounded }: SkeletonProps) => (
  <span
    className={clsx(
      styles["skeleton"],
      "skeleton",
      rounded && styles[`rounded_${rounded}`],
      className,
    )}
    style={{ width, height }}
  />
);

export default Skeleton;
