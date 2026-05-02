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
      <select id="regionFilter" className="regionFilterSelect">
        <option value="">전체</option>
        <option value="1">서울</option>
        <option value="6">부산</option>
        <option value="4">대구</option>
        <option value="2">인천</option>
        <option value="5">광주</option>
        <option value="3">대전</option>
        <option value="7">울산</option>
        <option value="8">세종</option>
        <option value="31">경기</option>
        <option value="32">강원</option>
        <option value="33">충북</option>
        <option value="34">충남</option>
        <option value="35">경북</option>
        <option value="36">경남</option>
        <option value="37">전북</option>
        <option value="38">전남</option>
        <option value="39">제주</option>
      </select>
      <select id="hashtagFilter" className="hashtagFilterSelect">
        <option value="">전체</option>
        <option value="C0112">#가족코스</option>
        <option value="C0113">#나홀로코스</option>
        <option value="C0114">#힐링코스</option>
        <option value="C0115">#도보코스</option>
        <option value="C0116">#캠핑코스</option>
        <option value="C0117">#맛코스</option>
      </select>
      <CourseCardList courses={courses} />
    </div>
  );
}
