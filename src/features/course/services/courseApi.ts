// import { CONTENT_TYPE_MAP, COURSE_CONTENT_TYPES } from "@/constants/tour";
// import type {
//   TourSpot,
//   PetDetail,
//   CommonDetail,
//   AICourse, // Course → AICourse
// } from "../course.types";

// // ─── 프록시 경유 API 호출 ──────
// async function fetchTour(endpoint: string, params: Record<string, string>) {
//   const query = new URLSearchParams({ endpoint, ...params });
//   const res = await fetch(`/api/pet-tour?${query}`);
//   if (!res.ok) throw new Error(`TourAPI 호출 실패 (${res.status})`);
//   const data = await res.json();

//   if (
//     data?.response?.header?.resultCode &&
//     data.response.header.resultCode !== "0000"
//   ) {
//     throw new Error(data.response.header.resultMsg || "API 오류");
//   }

//   const items = data?.response?.body?.items?.item ?? data?.items ?? data;
//   if (!items) return [];
//   return Array.isArray(items) ? items : [items];
// }

// export async function fetchPetSpotsByArea(
//   areaCode: string,
//   contentTypeId: string,
// ): Promise<TourSpot[]> {
//   return fetchTour("areaBasedList2", {
//     areaCode,
//     contentTypeId,
//     numOfRows: "30",
//     pageNo: "1",
//     arrange: "A",
//   });
// }
// // petTourYN: "Y"

// export async function fetchAllPetSpots(areaCode: string): Promise<TourSpot[]> {
//   const results = await Promise.allSettled(
//     COURSE_CONTENT_TYPES.map((ct) => fetchPetSpotsByArea(areaCode, ct)),
//   );
//   return results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
// }

// export async function fetchPetDetail(
//   contentId: string,
// ): Promise<PetDetail | null> {
//   const items = await fetchTour("detailPetTour2", { contentId });
//   return items[0] ?? null;
// }

// export async function fetchCommonDetail(
//   contentId: string,
// ): Promise<CommonDetail | null> {
//   const items = await fetchTour("detailCommon2", {
//     contentId,
//     defaultYN: "Y",
//     firstImageYN: "Y",
//     addrinfoYN: "Y",
//     mapinfoYN: "Y",
//     overviewYN: "Y",
//   });
//   return items[0] ?? null;
// }

// // export async function generateCourseWithAI(
// //   regionName: string,
// //   spots: TourSpot[],
// // ): Promise<AICourse[]> {
// //   const res = await fetch("/api/generate-course", {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ regionName, spots }),
// //   });

// //   if (!res.ok) throw new Error("AI 코스 생성 실패");
// //   return res.json();
// // }

// export function generateCourseWithAI(
//   regionName: string,
//   spots: TourSpot[],
// ): AICourse[] {
//   // 카테고리별로 분류
//   const byType: Record<string, TourSpot[]> = {};
//   for (const s of spots) {
//     const label = CONTENT_TYPE_MAP[s.contenttypeid] ?? "기타";
//     if (!byType[label]) byType[label] = [];
//     byType[label].push(s);
//   }

//   const pick = (type: string, n: number) => (byType[type] ?? []).slice(0, n);

//   // 코스 3개 구성
//   const courses: AICourse[] = [
//     {
//       id: "c1",
//       title: `${regionName} 자연 힐링 코스`,
//       theme: "자연힐링",
//       duration: "6-8시간",
//       petScore: 90,
//       summary: `${regionName}의 자연 속에서 반려동물과 함께하는 힐링 코스`,
//       spots: [
//         ...pick("관광지", 2),
//         ...pick("레포츠", 1),
//         ...pick("음식점", 1),
//       ].map((s) => ({
//         name: s.title,
//         type: CONTENT_TYPE_MAP[s.contenttypeid] ?? "기타",
//         stayTime: "1-2시간",
//         tip: "반려동물 동반 가능 시설입니다",
//       })),
//     },
//     {
//       id: "c2",
//       title: `${regionName} 문화 탐방 코스`,
//       theme: "문화탐방",
//       duration: "5-7시간",
//       petScore: 85,
//       summary: `${regionName}의 문화시설과 맛집을 반려동물과 함께 즐기는 코스`,
//       spots: [
//         ...pick("문화시설", 2),
//         ...pick("쇼핑", 1),
//         ...pick("음식점", 1),
//       ].map((s) => ({
//         name: s.title,
//         type: CONTENT_TYPE_MAP[s.contenttypeid] ?? "기타",
//         stayTime: "1-2시간",
//         tip: "반려동물 동반 가능 시설입니다",
//       })),
//     },
//     {
//       id: "c3",
//       title: `${regionName} 당일치기 풀코스`,
//       theme: "풀코스",
//       duration: "8-10시간",
//       petScore: 88,
//       summary: `${regionName}을 알차게 즐기는 반려동물 동반 풀코스`,
//       spots: [
//         ...pick("관광지", 1),
//         ...pick("문화시설", 1),
//         ...pick("음식점", 1),
//         ...pick("숙박", 1),
//       ].map((s) => ({
//         name: s.title,
//         type: CONTENT_TYPE_MAP[s.contenttypeid] ?? "기타",
//         stayTime: "1-2시간",
//         tip: "반려동물 동반 가능 시설입니다",
//       })),
//     },
//   ];

//   // 스팟이 없는 코스 필터링
//   return courses.filter((c) => c.spots.length > 0);
// }
