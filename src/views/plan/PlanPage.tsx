"use client";

import Link from "next/link";

interface Plan {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  spotCount: number;
  image: string | null;
}

const dummyPlans: Plan[] = [
  {
    id: "1",
    title: "제주도 반려견 여행",
    startDate: "2026-06-01",
    endDate: "2026-06-03",
    spotCount: 5,
    image: null,
  },
  {
    id: "2",
    title: "부산 바다 여행",
    startDate: "2026-07-10",
    endDate: "2026-07-12",
    spotCount: 3,
    image: null,
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function calcNights(start: string, end: string) {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  const nights = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${nights}박 ${nights + 1}일`;
}

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
          {plans.map((plan) => (
            <li key={plan.id}>
              <Link href={`/plan/${plan.id}`} className="planCard">
                <div className="planCardImg">
                  {plan.image ? (
                    <img src={plan.image} alt={plan.title} />
                  ) : (
                    <div className="planCardImgFallback" />
                  )}
                </div>

                <div className="planCardBody">
                  <h3 className="planCardTitle">{plan.title}</h3>

                  <div className="planCardDate">
                    <span>{formatDate(plan.startDate)}</span>
                    <span>{formatDate(plan.endDate)}</span>
                  </div>

                  <div className="planCardMeta">
                    <span className="metaChip">
                      {calcNights(plan.startDate, plan.endDate)}
                    </span>

                    <span className="metaChip">{plan.spotCount}개 장소</span>
                  </div>
                </div>
              </Link>
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
