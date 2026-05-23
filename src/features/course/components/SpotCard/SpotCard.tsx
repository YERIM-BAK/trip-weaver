import { SpotCardProps } from "../../course.types";
import styles from "./SpotCard.module.scss";

function SpotCard({ spot, order, isAdded, onAddToCourse }: SpotCardProps) {
  return (
    <article className={styles["spotCard"]}>
      {/* <span className={styles["spotOrder"]}>{order}</span> */}

      <div className={styles["spotContent"]}>
        <div className={styles["spotInfo"]}>
          <p className={styles["spotName"]}>
            {spot.name}{" "}
            {spot.category && (
              <span className={styles["spotCategory"]}>{spot.category}</span>
            )}
          </p>
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

        {spot.image && (
          <div className={styles["spotImage"]}>
            <img src={spot.image} alt={spot.name} />
          </div>
        )}
      </div>
      <div className={styles["spotFooter"]}>
        <button
          type="button"
          className={styles[isAdded ? "addedBtn" : "addBtn"]}
          onClick={onAddToCourse}
        >
          {isAdded ? "✓ 추가됨" : "+ 코스에 추가"}
        </button>
      </div>
    </article>
  );
}

export default SpotCard;
