"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import RangeSlider from "@/components/ui/RangeSlider/RangeSlider";

const AREA_ITEMS = [
  { label: "서울", code: "1", emoji: "🏙️" },
  { label: "인천", code: "2", emoji: "✈️" },
  { label: "대전", code: "3", emoji: "🌿" },
  { label: "대구", code: "4", emoji: "🍎" },
  { label: "광주", code: "5", emoji: "🌸" },
  { label: "부산", code: "6", emoji: "🌊" },
  { label: "울산", code: "7", emoji: "🐋" },
  { label: "세종", code: "8", emoji: "🏛️" },
  { label: "경기", code: "31", emoji: "🌾" },
  { label: "강원", code: "32", emoji: "⛰️" },
  { label: "충북", code: "33", emoji: "🌲" },
  { label: "충남", code: "34", emoji: "🦀" },
  { label: "경북", code: "35", emoji: "🍇" },
  { label: "경남", code: "36", emoji: "🐠" },
  { label: "전북", code: "37", emoji: "🌻" },
  { label: "전남", code: "38", emoji: "🍵" },
  { label: "제주", code: "39", emoji: "🍊" },
];

const PET_ITEMS = [
  { label: "강아지", emoji: "🐶" },
  { label: "고양이", emoji: "🐱" },
  { label: "기타", emoji: "🐾" },
];

const STYLE_ITEMS = [
  { label: "자연/힐링", emoji: "🌿" },
  { label: "도심/문화", emoji: "🏛️" },
  { label: "맛집탐방", emoji: "🍜" },
  { label: "액티비티", emoji: "🎯" },
];

const BUDGET_ITEMS = [
  { label: "5만원 이하", emoji: "💰" },
  { label: "5~15만원", emoji: "💰💰" },
  { label: "15~30만원", emoji: "💰💰💰" },
  { label: "30만원 이상", emoji: "💰💰💰💰" },
];

function HomePage() {
  const router = useRouter();
  const [areaCode, setAreaCode] = useState("");
  const [petType, setPetType] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [budget, setBudget] = useState(0);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const isReady =
    areaCode && startDate && endDate && petType && travelStyle && budget;

  const handleSubmit = () => {
    if (!isReady) return;
    const params = new URLSearchParams({
      areaCode,
      petType,
      style: travelStyle,
      budget: String(budget),
      startDate: startDate!.toISOString().split("T")[0],
      endDate: endDate!.toISOString().split("T")[0],
    });
    router.push(`/plan?${params}`);
  };

  return (
    <div className="homePage">
      <div className="formWrap">
        <section className="section">
          <h2 className="sectionLabel">
            <span className="dot" data-color="teal" aria-hidden="true" />
            어디로 떠날까요?
          </h2>
          <ul className="areaGrid" role="list">
            {AREA_ITEMS.map((area) => (
              <li key={area.code}>
                <button
                  type="button"
                  className="areaBtn"
                  aria-pressed={areaCode === area.code}
                  onClick={() => setAreaCode(area.code)}
                >
                  <span aria-hidden="true">{area.emoji}</span>
                  <span>{area.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="section">
          <h2 className="sectionLabel">
            <span className="dot" data-color="purple" aria-hidden="true" />
            언제 떠날까요?
          </h2>
          <div className="dateRow">
            <DatePicker
              mode="range"
              value={{ startDate, endDate }}
              onChange={({ startDate, endDate }) => {
                setStartDate(startDate);
                setEndDate(endDate);
              }}
              minDate={new Date()}
            />
          </div>
        </section>

        <section className="section">
          <h2 className="sectionLabel">
            <span className="dot" data-color="coral" aria-hidden="true" />
            어떤 친구와 함께하나요?
          </h2>
          <div className="chipRow" role="group" aria-label="반려동물 종류 선택">
            {PET_ITEMS.map((pet) => (
              <button
                key={pet.label}
                type="button"
                className="chip"
                aria-pressed={petType === pet.label}
                onClick={() => setPetType(pet.label)}
              >
                <span aria-hidden="true">{pet.emoji}</span>
                {pet.label}
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="sectionLabel">
            <span className="dot" data-color="amber" aria-hidden="true" />
            여행 스타일은요?
          </h2>
          <div className="chipRow" role="group" aria-label="여행 스타일 선택">
            {STYLE_ITEMS.map((s) => (
              <button
                key={s.label}
                type="button"
                className="chip"
                aria-pressed={travelStyle === s.label}
                onClick={() => setTravelStyle(s.label)}
              >
                <span aria-hidden="true">{s.emoji}</span>
                {s.label}
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="sectionLabel">
            <span className="dot" data-color="green" aria-hidden="true" />
            1인 기준 예산은요?
          </h2>
          <RangeSlider
            value={budget}
            onChange={setBudget}
            max={100}
            step={1}
            formatLabel={(v) => `${v}만원`}
            ticks={[
              { value: 0, label: "0원" },
              { value: 50, label: "50만원" },
              { value: 100, label: "100만원" },
            ]}
            ariaLabel="예산 선택"
          />
        </section>

        <button
          type="button"
          className="submitBtn"
          onClick={handleSubmit}
          disabled={!isReady}
          aria-disabled={!isReady}
        >
          🗺️ 코스 만들기
        </button>
      </div>
    </div>
  );
}

export default HomePage;

// import CourseCardList from "@/features/course/components/CourseCardList/CourseCardList";

// function HomePage() {
//   const courses = [
//     {
//       id: 1,
//       title: "한강 산책 코스",
//       description: "여유롭게 걷기 좋은 코스",
//       distance: "3.2km",
//       time: "45분",
//       petAllowed: true,
//       image: "/images/photo.jpg",
//     },
//     {
//       id: 2,
//       title: "북한산 힐링 코스",
//       description: "자연 속 산책",
//       distance: "5.1km",
//       time: "1시간 20분",
//       petAllowed: false,
//       image: "/images/photo.jpg",
//     },
//   ];
//   return (
//     <div>
//       <select id="regionFilter" className="regionFilterSelect">
//         <option value="">전체</option>
//         <option value="1">서울</option>
//         <option value="6">부산</option>
//         <option value="4">대구</option>
//         <option value="2">인천</option>
//         <option value="5">광주</option>
//         <option value="3">대전</option>
//         <option value="7">울산</option>
//         <option value="8">세종</option>
//         <option value="31">경기</option>
//         <option value="32">강원</option>
//         <option value="33">충북</option>
//         <option value="34">충남</option>
//         <option value="35">경북</option>
//         <option value="36">경남</option>
//         <option value="37">전북</option>
//         <option value="38">전남</option>
//         <option value="39">제주</option>
//       </select>
//       <select id="hashtagFilter" className="hashtagFilterSelect">
//         <option value="">전체</option>
//         <option value="C0112">#가족코스</option>
//         <option value="C0113">#나홀로코스</option>
//         <option value="C0114">#힐링코스</option>
//         <option value="C0115">#도보코스</option>
//         <option value="C0116">#캠핑코스</option>
//         <option value="C0117">#맛코스</option>
//       </select>
//       <CourseCardList courses={courses} />
//     </div>
//   );
// }

// export default HomePage;
