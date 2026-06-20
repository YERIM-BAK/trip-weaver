import clsx from "clsx";

import styles from "./SpotCard.module.scss";
import Tag from "@/components/ui/Tag/Tag";
import { TagColor } from "@/components/ui/Tag/Tag.types";
import Link from "next/link";
import { SpotCardProps } from "../../spot.types";

const tagColorMap: Record<string, TagColor> = {
  관광지: "sky",
  음식점: "peach",
  카페: "yellow",
  숙소: "purple",
  산책로: "green",
};

function SpotCard({
  spot,
  order,
  isAdded,
  onAddToCourse,
  className,
}: SpotCardProps) {
  return (
    <Link href={`/spots/${spot.id}?typeId=${spot.contenttypeid}`}>
      <article className={clsx(styles["spotCard"], "spotCard", className)}>
        <div className={clsx(styles["spotContent"], "spotContent")}>
          {spot.image && (
            <div className={clsx(styles["spotImage"], "spotImage")}>
              <img src={spot.image} alt={spot.name} />
            </div>
          )}
          <div className={clsx(styles["spotInfo"], "spotInfo")}>
            <p className={clsx(styles["spotName"], "spotName")}>{spot.name}</p>
            {spot.description && (
              <p className={styles["spotDesc"]}>{spot.description}</p>
            )}
            <div className={styles["spotMeta"]}>
              <span className={styles["spotAddress"]}>{spot.address}</span>
              {spot.duration && (
                <span className={styles["spotDuration"]}>
                  ⏱ {spot.duration}
                </span>
              )}
            </div>
            {spot.category && (
              <Tag
                size="sm"
                color={tagColorMap[spot.category] ?? "gray"}
                className={styles["spotTag"]}
              >
                {spot.category}
              </Tag>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default SpotCard;
