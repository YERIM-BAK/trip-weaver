import ExplorePage from "@/views/ExplorePage";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ExplorePage />
    </Suspense>
  );
}
