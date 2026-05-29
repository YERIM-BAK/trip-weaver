// import { useState, useCallback } from "react";
// import {
//   fetchAllPetSpots,
//   fetchPetDetail,
//   fetchCommonDetail,
//   generateCourseWithAI,
// } from "../services/courseApi";
// import type {
//   AICourse,
//   TourSpot,
//   ActiveSpot,
//   CourseScreen,
// } from "../course.types";
// import type { Region } from "@/constants/tour";

// export function useCourseGenerator() {
//   const [screen, setScreen] = useState<CourseScreen>("region");
//   const [loadMsg, setLoadMsg] = useState("");
//   const [error, setError] = useState("");

//   const [region, setRegion] = useState<Region | null>(null);
//   const [allSpots, setAllSpots] = useState<TourSpot[]>([]);
//   const [courses, setCourses] = useState<AICourse[]>([]); // Course → AICourse
//   const [activeCourse, setActiveCourse] = useState<AICourse | null>(null); // Course → AICourse
//   const [activeSpot, setActiveSpot] = useState<ActiveSpot | null>(null);

//   const handleRegionSelect = useCallback(async (reg: Region) => {
//     setRegion(reg);
//     setError("");
//     setScreen("loading");

//     try {
//       setLoadMsg("반려동물 동반 가능 시설을 불러오는 중...");
//       const spots = await fetchAllPetSpots(reg.id);

//       if (spots.length === 0) {
//         setError(
//           `${reg.name} 지역의 반려동물 동반 가능 시설 데이터가 없습니다.\n다른 지역을 선택해 보세요.`,
//         );
//         setScreen("region");
//         return;
//       }

//       setAllSpots(spots);
//       setLoadMsg(`${spots.length}개 시설 확인! AI가 최적 코스를 구성 중...`);

//       // const generated = await generateCourseWithAI(reg.name, spots);
//       const generated = generateCourseWithAI(reg.name, spots);
//       setCourses(generated);
//       setScreen("courses");
//     } catch (e) {
//       setError(`오류: ${e instanceof Error ? e.message : String(e)}`);
//       setScreen("region");
//     }
//   }, []);

//   const handleCourseSelect = useCallback((course: AICourse) => {
//     // Course → AICourse
//     setActiveCourse(course);
//     setScreen("detail");
//   }, []);

//   const handleSpotClick = useCallback(
//     async (spotName: string) => {
//       const apiSpot = allSpots.find((s) => s.title === spotName) ?? null; // TourSpot → apiSpot (변수명)
//       setActiveSpot({
//         name: spotName,
//         apiSpot,
//         petDetail: null,
//         commonDetail: null,
//       }); // TourSpot: → apiSpot:
//       setScreen("spotDetail");

//       if (!apiSpot) return;

//       try {
//         const [petDetail, commonDetail] = await Promise.all([
//           fetchPetDetail(apiSpot.contentid).catch(() => null), // TourSpot → apiSpot
//           fetchCommonDetail(apiSpot.contentid).catch(() => null), // TourSpot → apiSpot
//         ]);
//         setActiveSpot((prev) =>
//           prev ? { ...prev, petDetail, commonDetail } : prev,
//         );
//       } catch (_) {}
//     },
//     [allSpots],
//   );

//   return {
//     screen,
//     loadMsg,
//     error,
//     region,
//     allSpots,
//     courses,
//     activeCourse,
//     activeSpot,
//     handleRegionSelect,
//     handleCourseSelect,
//     handleSpotClick,
//   };
// }
