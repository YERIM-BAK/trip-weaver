"use client";

import { useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import { Course } from "../../course.types";

export default function CourseCardList({ courses }: { courses: Course[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  const handleBookmark = (id: number) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  return (
    <ul role="listbox">
      {courses.map((course) => {
        const selected = selectedId === course.id;

        return (
          <li key={course.id}>
            <CourseCard
              course={course}
              isSelected={selected}
              isBookmarked={bookmarks.includes(course.id)}
              onSelect={handleSelect}
              onBookmark={handleBookmark}
            />
          </li>
        );
      })}
    </ul>
  );
}
