import { PlanDetail } from "./plan.types";

import jejuImg from "@/assets/images/img/jeju.jpg";
import dogIcon from "@/assets/images/img/icon-dog.png";

export const dummyPlanDetail: PlanDetail = {
  id: "1",
  title: "제주도 반려견 여행",
  startDate: "2024.06.01",
  endDate: "2024.06.03",
  nights: 2,
  status: "다녀옴",
  coverImage: jejuImg.src,
  petName: "몽이",
  petImage: dogIcon.src,
  spotCount: 8,
  photoCount: 34,
  transport: "자가용",
  photos: [
    { id: "1", url: "/images/img/jeju2.jpg" },
    { id: "2", url: "/images/img/jeju3.jpg" },
    { id: "3", url: "/images/img/jeju4.jpg" },
    { id: "4", url: "/images/img/jeju5.jpg" },
    { id: "5", url: "/images/img/jeju6.jpg" },
  ],
};
