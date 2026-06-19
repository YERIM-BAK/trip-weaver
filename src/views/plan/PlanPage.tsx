"use client";

import PlanCard from "@/features/plan/components/PlanCard/PlanCard";
import Link from "next/link";
import jejuImg from "@/assets/images/img/jeju.jpg";
import busanImg from "@/assets/images/img/busan.jpg";

interface Plan {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  spotCount: number;
  status: "준비중" | "여행중" | "다녀옴";
  image: string | null;
}

const dummyPlans: Plan[] = [
  {
    id: "1",
    title: "제주도 반려견 여행",
    startDate: "2026-06-01",
    endDate: "2026-06-03",
    spotCount: 5,
    status: "다녀옴",
    image: jejuImg.src,
  },
  {
    id: "2",
    title: "부산 바다 여행",
    startDate: "2026-07-10",
    endDate: "2026-07-12",
    spotCount: 3,
    status: "준비중",
    image: busanImg.src,
  },
];

// function formatDate(dateStr: string) {
//   const date = new Date(dateStr);
//   return `${date.getMonth() + 1}월 ${date.getDate()}일`;
// }

// function calcNights(start: string, end: string) {
//   const diff = new Date(end).getTime() - new Date(start).getTime();
//   const nights = Math.floor(diff / (1000 * 60 * 60 * 24));
//   return `${nights}박 ${nights + 1}일`;
// }

export default function PlanPage() {
  const plans = dummyPlans; // 나중에 API로 교체

  return (
    <section className="planPage">
      {plans.length === 0 ? (
        <div className="emptyState">
          <h2 className="emptyTitle">아직 만든 일정이 없어요</h2>
          <p className="emptyDesc">
            반려동물과 함께할 여행 일정을 만들어보세요
          </p>
          <Link href="/plan/new" className="createBtn">
            + 새 일정 만들기
          </Link>
        </div>
      ) : (
        <ul className="planList">
          {dummyPlans.map((plan) => (
            <li key={plan.id}>
              <PlanCard key={plan.id} {...plan} />
            </li>
          ))}
        </ul>
      )}

      <Link href="/plan/new" className="fab">
        +
      </Link>
    </section>
  );
}
