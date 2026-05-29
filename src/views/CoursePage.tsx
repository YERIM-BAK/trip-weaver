"use client";

// import clsx from "clsx";

// import styles from "./CoursePage.module.scss";
// import { useCourseGenerator } from "@/features/course/hooks/useCourseGenerator";
// import { RegionSelector } from "@/features/course/components/RegionSelector/RegionSelector";
// import { CourseList } from "@/features/course/components/CourseList/CourseList";
// import { CourseDetail } from "@/features/course/components/CourseDetail/Coursedetail";
// import { SpotDetail } from "@/features/course/components/SpotDetail/SpotDetail";

// export function CoursePage() {
//   const {
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
//   } = useCourseGenerator();

//   return (
//     <div className={clsx(styles["page"], "course-page")}>
//       <main className={styles["main"]}>
//         {screen === "region" && (
//           <RegionSelector onSelect={handleRegionSelect} error={error} />
//         )}

//         {screen === "loading" && (
//           <div className={styles["loading"]}>
//             <div className={styles["spinner"]} />
//             <p className={styles["loadingRegion"]}>
//               {region?.emoji} {region?.name}
//             </p>
//             <p className={styles["loadingMsg"]}>{loadMsg}</p>
//           </div>
//         )}

//         {screen === "courses" && region && (
//           <CourseList
//             region={region}
//             courses={courses}
//             totalSpots={allSpots.length}
//             onSelect={handleCourseSelect}
//           />
//         )}

//         {screen === "detail" && activeCourse && (
//           <CourseDetail
//             course={activeCourse}
//             allSpots={allSpots}
//             onSpotClick={handleSpotClick}
//           />
//         )}

//         {screen === "spotDetail" && activeSpot && (
//           <SpotDetail spot={activeSpot} />
//         )}
//       </main>
//     </div>
//   );
// }

export default function CoursePage() {
  return <div>작업중</div>;
}
