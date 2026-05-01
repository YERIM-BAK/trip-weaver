"use client";

import Image from "next/image";
import styles from "./CourseCard.module.scss";
import clsx from "clsx";
import { Course } from "../../course.types";

type CourseCardProps = {
  course: Course;
  isSelected: boolean;
  isBookmarked: boolean;
  onSelect: (id: number) => void;
  onBookmark: (id: number) => void;
};

export default function CourseCard({
  course,
  isSelected,
  isBookmarked,
  onSelect,
  onBookmark,
}: CourseCardProps) {
  return (
    <div
      className={clsx(styles["courseCard"], { [styles.selected]: isSelected })}
    >
      <button
        type="button"
        className={styles.courseCardBtn}
        onClick={() => onSelect(course.id)}
        aria-pressed={isSelected}
        aria-label={`${course.title} 코스 선택`}
      >
        <div className={styles.courseCardImage}>
          <Image
            src={course.image}
            alt={course.title}
            fill
            sizes="160"
            priority
          />
        </div>

        <div className={styles.courseCardContent}>
          <h3 className={styles.title}>{course.title}</h3>

          <p className={styles.desc}>{course.description}</p>

          <div className={styles.meta}>
            <span>{course.distance}</span>
            <span>{course.time}</span>

            {course.petAllowed && <span>🐶 가능</span>}
          </div>
        </div>
      </button>

      <button
        type="button"
        className={styles.bookmark}
        aria-pressed={isBookmarked}
        aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
        onClick={(e) => {
          e.stopPropagation();
          onBookmark(course.id);
        }}
      >
        {isBookmarked ? "★" : "☆"}
      </button>
    </div>
  );
}
