import Link from "next/link";
import styles from "./EmptyState.module.scss";

type EmptyStateProps = {
  text: string;
  description?: string;
  buttonText?: string;
  href?: string;
};

export default function EmptyState({
  text,
  description,
  href,
  buttonText,
}: EmptyStateProps) {
  return (
    <div className={styles["emptyState"]}>
      <p className={styles["emptyText"]}>{text}</p>

      <p className={styles["emptyDescription"]}>{description}</p>

      {href && buttonText && (
        <Link href={href} className={styles["emptyButton"]}>
          <span className={styles["emptyButtonText"]}>{buttonText}</span>
        </Link>
      )}
    </div>
  );
}
