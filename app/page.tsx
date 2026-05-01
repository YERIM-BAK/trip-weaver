"use client";

import CourseCardList from "@/features/course/components/CourseCardList/CourseCardList";

export default function Home() {
  const courses = [
    {
      id: 1,
      title: "한강 산책 코스",
      description: "여유롭게 걷기 좋은 코스",
      distance: "3.2km",
      time: "45분",
      petAllowed: true,
      image: "/images/photo.jpg",
    },
    {
      id: 2,
      title: "북한산 힐링 코스",
      description: "자연 속 산책",
      distance: "5.1km",
      time: "1시간 20분",
      petAllowed: false,
      image: "/images/photo.jpg",
    },
  ];
  return (
    <div style={{ padding: 20 }}>
      <CourseCardList courses={courses} />
    </div>
  );
}
