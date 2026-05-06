import { SpotCardProps } from "../../course.types";
import styles from "./SpotCard.module.scss";

function SpotCard({ spot, order }: SpotCardProps) {
  return (
    <article className={styles["spotCard"]}>
      <div className={styles["spotOrder"]}>{order}</div>

      <div className={styles["spotBody"]}>
        <div className={styles["spotHeader"]}>
          <h3 className={styles["spotName"]}>{spot.name}</h3>
          {spot.category && (
            <span className={styles["spotCategory"]}>{spot.category}</span>
          )}
        </div>

        {spot.description && (
          <p className={styles["spotDesc"]}>{spot.description}</p>
        )}

        <div className={styles["spotMeta"]}>
          <span className={styles["spotAddress"]}>{spot.address}</span>
          {spot.duration && (
            <span className={styles["spotDuration"]}>⏱ {spot.duration}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default SpotCard;
