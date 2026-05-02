"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CourseCardList from "@/features/course/components/CourseCardList/CourseCardList";

interface Spot {
  contentid: string;
  title: string;
  firstimage: string;
  firstimage2: string;
  addr1: string;
  addr2: string;
  dist?: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  distance: string;
  time: string;
  petAllowed: boolean;
  image: string;
}

function spotToCourse(spot: Spot): Course {
  return {
    id: Number(spot.contentid),
    title: spot.title,
    description: spot.addr1 + (spot.addr2 ? ` ${spot.addr2}` : ""),
    distance: spot.dist ? `${(Number(spot.dist) / 1000).toFixed(1)}km` : "",
    time: "",
    petAllowed: true, // ❗ 아직은 무조건 true (추후 API로 필터링 필요)
    image: spot.firstimage || spot.firstimage2 || "/images/placeholder.jpg",
  };
}

function PlanPage() {
  const searchParams = useSearchParams();

  const areaCode = searchParams?.get("areaCode") ?? "";
  const petType = searchParams?.get("petType") ?? "";
  const travelStyle = searchParams?.get("style") ?? "";
  const startDate = searchParams?.get("startDate") ?? "";
  const endDate = searchParams?.get("endDate") ?? "";

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!areaCode) return;

    const fetchSpots = async () => {
      setLoading(true);
      setError("");

      try {
        const url = `/api/tour?endpoint=areaBasedList2&areaCode=${areaCode}&numOfRows=20&pageNo=1`;

        console.log("요청 URL:", url);

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`API 실패: ${res.status}`);
        }

        const json = await res.json();
        console.log("API RAW:", json);
        const items = json?.response?.body?.items?.item ?? [];

        console.log("파싱된 items:", items);

        setCourses(items.map(spotToCourse));
      } catch (err) {
        console.error(err);
        setError("장소 정보를 불러오는 데 실패했어요. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, [areaCode]);

  return (
    <div className="planPage">
      <div className="summaryBar">
        <div className="summaryInner">
          <span className="summaryItem">📍 {areaCode}</span>

          {startDate && endDate && (
            <span className="summaryItem">
              📅 {startDate} ~ {endDate}
            </span>
          )}

          {petType && <span className="summaryItem">🐾 {petType}</span>}
          {travelStyle && <span className="summaryItem">✨ {travelStyle}</span>}
        </div>
      </div>

      <div className="content">
        {loading && (
          <div className="stateBox">
            <span className="spinner" />
            <p>반려동물 동반 가능 장소를 불러오는 중...</p>
          </div>
        )}

        {!loading && error && (
          <div className="stateBox">
            <p>{error}</p>
            <button
              type="button"
              className="retryBtn"
              onClick={() => window.location.reload()}
            >
              다시 시도
            </button>
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className="stateBox">
            <p>해당 지역에 장소가 없어요 🐾</p>
          </div>
        )}

        {!loading && !error && courses.length > 0 && (
          <>
            <p className="resultCount">
              장소 <strong>{courses.length}곳</strong>
            </p>
            <CourseCardList courses={courses} />
          </>
        )}
      </div>
    </div>
  );
}

export default PlanPage;
