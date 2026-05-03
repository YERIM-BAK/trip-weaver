// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import SpotCard from "@/features/course/components/SpotCard/SpotCard";
// import { DayCourse } from "@/features/course/course.types";

// function PlanPage() {
//   const searchParams = useSearchParams();

//   const areaCode = searchParams?.get("areaCode") ?? "";
//   const petType = searchParams?.get("petType") ?? "";
//   const travelStyle = searchParams?.get("style") ?? "";
//   const startDate = searchParams?.get("startDate") ?? "";
//   const endDate = searchParams?.get("endDate") ?? "";
//   const budget = searchParams?.get("budget") ?? "";

//   const [courses, setCourses] = useState<DayCourse[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!areaCode) return;

//     const fetchCourses = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const res = await fetch("http://localhost:8000/api/courses/generate", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             areaCode,
//             petType,
//             style: travelStyle,
//             budget,
//             startDate,
//             endDate,
//           }),
//         });

//         if (!res.ok) throw new Error(`API 실패: ${res.status}`);

//         const json = await res.json();
//         const parsed = typeof json === "string" ? JSON.parse(json) : json;
//         setCourses(parsed.courses ?? []);
//       } catch (err) {
//         console.error(err);
//         setError("코스를 생성하는 데 실패했어요. 다시 시도해주세요.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [areaCode]);

//   return (
//     <div className="planPage">
//       {/* 조건 요약 바 */}
//       <section className="summaryBar" aria-label="선택한 여행 조건">
//         <ul className="summaryInner" role="list">
//           <li className="summaryItem">📍 {areaCode}</li>
//           {startDate && endDate && (
//             <li className="summaryItem">
//               📅 {startDate} ~ {endDate}
//             </li>
//           )}
//           {petType && <li className="summaryItem">🐾 {petType}</li>}
//           {travelStyle && <li className="summaryItem">✨ {travelStyle}</li>}
//           {budget && <li className="summaryItem">💰 {budget}만원</li>}
//         </ul>
//       </section>

//       {/* 메인 콘텐츠 */}
//       <div className="content">
//         {/* 로딩 */}
//         {loading && (
//           <div
//             className="stateBox"
//             role="status"
//             aria-live="polite"
//             aria-busy="true"
//           >
//             <span className="spinner" aria-hidden="true" />
//             <p>AI가 코스를 생성하는 중...</p>
//           </div>
//         )}

//         {/* 에러 */}
//         {!loading && error && (
//           <div className="stateBox" role="alert">
//             <p>{error}</p>
//             <button
//               type="button"
//               className="retryBtn"
//               onClick={() => window.location.reload()}
//             >
//               다시 시도
//             </button>
//           </div>
//         )}

//         {/* 빈 상태 */}
//         {!loading && !error && courses.length === 0 && (
//           <div className="stateBox" role="status" aria-live="polite">
//             <p>코스를 불러오는 중이에요 🐾</p>
//           </div>
//         )}

//         {/* 코스 결과 */}
//         {!loading && !error && courses.length > 0 && (
//           <section aria-label="생성된 여행 코스">
//             <p className="resultCount">
//               총 <strong>{courses.length}일</strong> 코스
//             </p>
//             <ol className="courseList" role="list">
//               {courses.map((day) => (
//                 <li key={day.day} className="dayItem">
//                   <h2 className="dayTitle">
//                     <span className="dayBadge" aria-label={`${day.day}일차`}>
//                       Day {day.day}
//                     </span>
//                     <time dateTime={day.date}>{day.date}</time>
//                   </h2>
//                   <ol
//                     className="spotList"
//                     role="list"
//                     aria-label={`${day.day}일차 장소 목록`}
//                   >
//                     {day.spots.map((spot, i) => (
//                       <li key={i} className="spotItem">
//                         <SpotCard spot={spot} order={i + 1} />
//                       </li>
//                     ))}
//                   </ol>
//                 </li>
//               ))}
//             </ol>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PlanPage;
