import clsx from "clsx";
import styles from "./Tag.module.scss";
import { TagProps } from "./Tag.types";

export default function Tag({
  children,
  color = "gray",
  size = "md",
  icon,
  className,
}: TagProps) {
  return (
    <span
      className={clsx(
        styles["tag"],
        "tag",
        styles[color],
        styles[size],
        className,
      )}
    >
      {icon && <span className={styles.icon}>{icon}</span>}

      {children}
    </span>
  );
}
