import styles from "./Chip.module.scss";

export type ChipItem = {
  label: string;
  onClick?: () => void;
  onClear?: () => void;
  id: string;
};

function Chip({ label, onClick, onClear }: ChipItem) {
  return (
    <button className={styles["chip"]} onClick={onClick}>
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
