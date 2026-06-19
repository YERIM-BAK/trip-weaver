import { create } from "zustand";

export interface Plan {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  nights: number;
  status: "준비중" | "여행중" | "다녀옴";
  image?: string | null;
}

interface PlanStore {
  plans: Plan[];
  setPlans: (plans: Plan[]) => void;
  addPlan: (plan: Plan) => void;
  updatePlan: (id: string, plan: Partial<Plan>) => void;
  deletePlan: (id: string) => void;
}

export const usePlanStore = create<PlanStore>((set) => ({
  plans: [],

  setPlans: (plans) => set({ plans }),

  addPlan: (plan) => set((state) => ({ plans: [...state.plans, plan] })),

  updatePlan: (id, updated) =>
    set((state) => ({
      plans: state.plans.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    })),

  deletePlan: (id) =>
    set((state) => ({
      plans: state.plans.filter((p) => p.id !== id),
    })),
}));
