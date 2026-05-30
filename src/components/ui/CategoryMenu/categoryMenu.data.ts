import {
  MapPinned,
  Route,
  CalendarDays,
  Hotel,
  Coffee,
  Utensils,
  Trees,
  Ellipsis,
} from "lucide-react";

export const categoryMenu = [
  {
    label: "인기 장소",
    icon: MapPinned,
    color: "sky",
    href: "/popular",
  },
  {
    label: "맞춤 코스",
    icon: Route,
    color: "mint",
    href: "/course",
    disabled: true,
  },
  {
    label: "여행 일정",
    icon: CalendarDays,
    color: "pink",
    href: "/plan",
  },
  {
    label: "호텔 · 숙소",
    icon: Hotel,
    color: "blue",
    href: "/hotel",
  },
  {
    label: "카페",
    icon: Coffee,
    color: "peach",
    href: "/cafe",
  },
  {
    label: "맛집",
    icon: Utensils,
    color: "lemon",
    href: "/food",
  },
  {
    label: "산책로",
    icon: Trees,
    color: "green",
    href: "/walk",
  },
  {
    label: "더보기",
    icon: Ellipsis,
    color: "ivory",
    href: "/more",
  },
];
