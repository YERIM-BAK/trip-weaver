// 지역 코드
export const AREA_CODES = [
  { code: "", name: "전국" },
  { code: "1", name: "서울" },
  { code: "2", name: "인천" },
  { code: "3", name: "대전" },
  { code: "4", name: "대구" },
  { code: "5", name: "광주" },
  { code: "6", name: "부산" },
  { code: "7", name: "울산" },
  { code: "8", name: "세종" },
  { code: "31", name: "경기" },
  { code: "32", name: "강원" },
  { code: "33", name: "충북" },
  { code: "34", name: "충남" },
  { code: "35", name: "경북" },
  { code: "36", name: "경남" },
  { code: "37", name: "전북" },
  { code: "38", name: "전남" },
  { code: "39", name: "제주" },
];

export const REGIONS = [
  { id: "1", name: "서울", emoji: "🏙️" },
  { id: "2", name: "인천", emoji: "✈️" },
  { id: "3", name: "대전", emoji: "🌿" },
  { id: "4", name: "대구", emoji: "🍎" },
  { id: "5", name: "광주", emoji: "🎨" },
  { id: "6", name: "부산", emoji: "🌊" },
  { id: "7", name: "울산", emoji: "🏭" },
  { id: "8", name: "세종", emoji: "🏛️" },
  { id: "31", name: "경기도", emoji: "🌸" },
  { id: "32", name: "강원도", emoji: "⛰️" },
  { id: "33", name: "충청북도", emoji: "🍃" },
  { id: "34", name: "충청남도", emoji: "🌾" },
  { id: "35", name: "경상북도", emoji: "🎎" },
  { id: "36", name: "경상남도", emoji: "🐟" },
  { id: "37", name: "전라북도", emoji: "🥢" },
  { id: "38", name: "전라남도", emoji: "🎋" },
  { id: "39", name: "제주도", emoji: "🌺" },
] as const;

export const CONTENT_TYPE_MAP: Record<string, string> = {
  "12": "관광지",
  "14": "문화시설",
  "15": "행사/공연",
  "28": "레포츠",
  "32": "숙박",
  "38": "쇼핑",
  "39": "음식점",
};

export const COURSE_CONTENT_TYPES = [
  "12",
  "14",
  "28",
  "32",
  "38",
  "39",
] as const;

export type Region = (typeof REGIONS)[number];
