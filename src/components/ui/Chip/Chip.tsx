import clsx from "clsx";
import styles from "./Chip.module.scss";

export type ChipItem = {
  label: string;
  onClick?: () => void;
  onClear?: () => void;
  id: string;
  isActive?: boolean;
};

function Chip({ label, onClick, onClear, isActive }: ChipItem) {
  return (
    <button
      className={clsx(styles["chip"], "chip", isActive && styles["is-active"])}
      onClick={onClick}
    >
      <span className={styles["chipText"]}>{label}</span>

      {onClear && (
        <span
          className={styles["clearBtn"]}
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
        >
          ✕
        </span>
      )}
    </button>
  );
}

export default Chip;
