import PlanDetailPage from "@/views/plan/PlanDetailPage";
import { dummyPlanDetail } from "@/features/plan/plan.dummy";

export default function Page() {
  return <PlanDetailPage plan={dummyPlanDetail} />;
}
