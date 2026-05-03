"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import RangeSlider from "@/components/ui/RangeSlider/RangeSlider";
import Map from "@/components/ui/Map/Map";
import { LatLng, MapMarker } from "@/components/ui/Map/Map.types";
import { DayCourse } from "@/features/course/course.types";
import SpotCard from "@/features/course/components/SpotCard/SpotCard";
import LoadingOverlay from "@/components/ui/LoadingOverlay/LoadingOverlay";

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

const AREA_CENTER: Record<string, LatLng> = {
  "1": { lat: 37.5665, lng: 126.978 }, // 서울
  "2": { lat: 37.4563, lng: 126.7052 }, // 인천
  "3": { lat: 36.3504, lng: 127.3845 }, // 대전
  "4": { lat: 35.8714, lng: 128.6014 }, // 대구
  "5": { lat: 35.1595, lng: 126.8526 }, // 광주
  "6": { lat: 35.1796, lng: 129.0756 }, // 부산
  "7": { lat: 35.5384, lng: 129.3114 }, // 울산
  "8": { lat: 36.48, lng: 127.289 }, // 세종
  "31": { lat: 37.4138, lng: 127.5183 }, // 경기
  "32": { lat: 37.8228, lng: 128.1555 }, // 강원
  "33": { lat: 36.6358, lng: 127.4915 }, // 충북
  "34": { lat: 36.6588, lng: 126.6728 }, // 충남
  "35": { lat: 36.4919, lng: 128.8889 }, // 경북
  "36": { lat: 35.4606, lng: 128.2132 }, // 경남
  "37": { lat: 35.7175, lng: 127.153 }, // 전북
  "38": { lat: 34.8679, lng: 126.991 }, // 전남
  "39": { lat: 33.4996, lng: 126.5312 }, // 제주
};

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
  // const selectedArea = AREA_ITEMS.find((a) => a.code === areaCode);
  // const isReady =
  //   areaCode && startDate && endDate && petType && travelStyle && budget;

  // const handleSubmit = () => {
  //   if (!isReady) return;
  //   const params = new URLSearchParams({
  //     areaCode: selectedArea?.label ?? areaCode,
  //     petType,
  //     style: travelStyle,
  //     budget: String(budget),
  //     startDate: startDate!.toISOString().split("T")[0],
  //     endDate: endDate!.toISOString().split("T")[0],
  //   });
  //   router.push(`/plan?${params}`);
  // };
  // 코스 결과 상태
  const [courses, setCourses] = useState<DayCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // 지도 상태
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [polyline, setPolyline] = useState<LatLng[]>([]);
  const [mapCenter, setMapCenter] = useState<LatLng>(
    AREA_CENTER[areaCode] ?? { lat: 36.5, lng: 127.5 },
  );
  const selectedArea = AREA_ITEMS.find((a) => a.code === areaCode);
  const isReady =
    areaCode && startDate && endDate && petType && travelStyle && budget;

  const handleSubmit = async () => {
    if (!isReady) return;

    setLoading(true);
    setError("");
    setCourses([]);
    setSelectedDay(null);
    setMarkers([]);
    setPolyline([]);

    try {
      const res = await fetch("http://localhost:8000/api/courses/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          areaCode: selectedArea?.label ?? areaCode,
          petType,
          style: travelStyle,
          budget: String(budget),
          startDate: startDate!.toISOString().split("T")[0],
          endDate: endDate!.toISOString().split("T")[0],
        }),
      });

      if (!res.ok) throw new Error(`API 실패: ${res.status}`);

      const json = await res.json();
      const parsed = typeof json === "string" ? JSON.parse(json) : json;
      const fetched: DayCourse[] = parsed.courses ?? [];
      setCourses(fetched);

      // 첫 번째 day 자동 선택
      if (fetched.length > 0) {
        applyDayToMap(fetched[0]);
        setSelectedDay(fetched[0].day);
      }
    } catch (err) {
      console.error(err);
      setError("코스를 생성하는 데 실패했어요. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // day 선택 → 지도 업데이트
  const applyDayToMap = (day: DayCourse) => {
    const validSpots = day.spots.filter((s) => s.lat !== 0 && s.lng !== 0);

    const nextMarkers: MapMarker[] = validSpots.map((spot, i) => ({
      id: `${day.day}-${i}`,
      position: { lat: spot.lat, lng: spot.lng },
      label: spot.name,
      active: i === 0,
    }));

    const nextPolyline: LatLng[] = validSpots.map((s) => ({
      lat: s.lat,
      lng: s.lng,
    }));

    setMarkers(nextMarkers);
    setPolyline(nextPolyline);

    if (validSpots.length > 0) {
      setMapCenter({ lat: validSpots[0].lat, lng: validSpots[0].lng });
    }
  };

  const handleDayClick = (day: DayCourse) => {
    setSelectedDay(day.day);
    applyDayToMap(day);
  };

  const handleDetailClick = (day: DayCourse) => {
    const params = new URLSearchParams({
      areaCode: selectedArea?.label ?? areaCode,
      petType,
      style: travelStyle,
      budget: String(budget),
      startDate: startDate!.toISOString().split("T")[0],
      endDate: endDate!.toISOString().split("T")[0],
    });
    // router.push(`/plan?${params}`);
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
                  onClick={() => {
                    setAreaCode(area.code);
                    setMapCenter(
                      AREA_CENTER[area.code] ?? { lat: 36.5, lng: 127.5 },
                    );
                  }}
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
          disabled={!isReady || loading}
        >
          {loading ? "코스 생성 중..." : "🗺️ 코스 만들기"}
        </button>
      </div>

      <div>
        <div className="mapWrap">
          <div className="mapContainer">
            <Map
              center={mapCenter}
              markers={markers}
              polyline={polyline}
              zoom={13}
            />
          </div>
        </div>

        <div className="courseResult">
          {loading && <LoadingOverlay message="AI가 코스를 생성하는 중" />}
          {!loading && error && (
            <div className="stateBox" role="alert">
              <p>{error}</p>
              <button type="button" className="retryBtn" onClick={handleSubmit}>
                다시 시도
              </button>
            </div>
          )}

          {/* 코스 리스트 */}
          {!loading && !error && courses.length > 0 && (
            <section>
              <p className="resultCount">
                총 <strong>{courses.length}일</strong> 코스
              </p>
              <ol className="courseList">
                {courses.map((day) => (
                  <li key={day.day} className="dayItem">
                    <button
                      type="button"
                      className="dayHeader"
                      aria-pressed={selectedDay === day.day}
                      onClick={() => handleDayClick(day)}
                    >
                      <span className="dayBadge" aria-label={`${day.day}일차`}>
                        Day {day.day}
                      </span>
                      <time dateTime={day.date}>{day.date}</time>
                      <span className="spotCount">
                        {day.spots.length}개 장소
                      </span>
                    </button>

                    {selectedDay === day.day && (
                      <>
                        <ol
                          className="spotList"
                          role="list"
                          aria-label={`${day.day}일차 장소 목록`}
                        >
                          {day.spots.map((spot, i) => (
                            <li key={i} className="spotItem">
                              <SpotCard spot={spot} order={i + 1} />
                            </li>
                          ))}
                        </ol>
                        <button
                          type="button"
                          className="detailBtn"
                          onClick={() => handleDetailClick(day)}
                        >
                          상세보기 →
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
