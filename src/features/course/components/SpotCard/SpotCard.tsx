import { Spot } from "../../course.types";
import styles from "./SpotCard.module.scss"

interface SpotCardProps {
  spot: Spot;
  order: number;
}

function SpotCard({ spot, order }: SpotCardProps) {
  return (
    <article className={styles["spotCard"]}>
      <div className={styles["spotOrder"]}>{order}</div>

      <div className={styles["spotBody"]}>
        <header className={styles["spotHeader"]}>
          <h3 className={styles["spotName"]}>{spot.name}</h3>
          {spot.category && (
            <span className={styles["spotCategory"]}>{spot.category}</span>
          )}
        </header>

        {spot.description && (
          <p className={styles["spotDesc"]}>{spot.description}</p>
        )}

        <footer className={styles["spotMeta"]}>
          <span className={styles["spotAddress"]}>{spot.address}</span>
          {spot.duration && (
            <span className={styles["spotDuration"]}>⏱ {spot.duration}</span>
          )}
        </footer>
      </div>
    </article>
  );
}

export default SpotCard;
