import clsx from "clsx";
import styles from "./CategoryMenu.module.scss";
import { categoryItem } from "./categoryMenu.types";
import Link from "next/link";

export default function CategoryItem({
  label,
  icon: Icon,
  color,
  href,
}: categoryItem) {
  return (
    <Link href={href} className={clsx(styles.categoryItem, styles[color])}>
      <span className={styles.iconBox}>
        <Icon size={22} strokeWidth={2.2} />
      </span>

      <span className={styles.categoryTitle}>{label}</span>
    </Link>
  );
}
