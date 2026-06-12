import { COURSE_CONTENT_TYPES } from "@/constants/tour";
import { PetSpot } from "./petTour.types";

const PET_API_BASE = "https://apis.data.go.kr/B551011/KorPetTourService2";
const API_KEY = process.env.TOUR_API_KEY!;

async function fetchPetTour(endpoint: string, params: Record<string, string>) {
  const query = new URLSearchParams({ endpoint, ...params });
  const res = await fetch(`/api/pet-tour?${query}`);
  if (!res.ok) throw new Error("TourAPI 호출 실패");
  return res.json();
}

// 위치 기반 관광지
export async function getPetFriendlyNearby(
  lat: number,
  lng: number,
  radius: number = 20000,
): Promise<PetSpot[]> {
  const response = await fetchPetTour("locationBasedList2", {
    mapX: String(lng),
    mapY: String(lat),
    radius: String(radius),
    numOfRows: "20",
    pageNo: "1",
  });

  return Array.isArray(response) ? response : (response?.items ?? []);
}

// 반려동물 동반 여행 정보 (전용 API!) - 상세에서 사용 예정
export async function getPetTourInfo(contentId: string) {
  const response = await fetchPetTour("detailPetTour2", { contentId });
  return Array.isArray(response) ? response[0] : response;
}

export async function fetchPetSpotsByArea({
  areaCode = "",
  contentTypeId = "",
  cat1 = "",
  cat2 = "",
  cat3 = "",
  numOfRows = 20,
  pageNo = 1,
  arrange = "A",
}: {
  areaCode?: string;
  contentTypeId?: string;
  cat1?: string;
  cat2?: string;
  cat3?: string;
  numOfRows?: number;
  pageNo?: number;
  arrange?: "A" | "P" | "R";
} = {}): Promise<PetSpot[]> {
  const params: Record<string, string> = {
    numOfRows: String(numOfRows),
    pageNo: String(pageNo),
    arrange,
  };

  if (areaCode) params.areaCode = areaCode;
  if (contentTypeId) params.contentTypeId = contentTypeId;
  if (cat1) params.cat1 = cat1;
  if (cat2) params.cat2 = cat2;
  if (cat3) params.cat3 = cat3;

  const response = await fetchPetTour("areaBasedList2", params);
  return Array.isArray(response) ? response : (response?.items ?? []);
}

// 공통 상세 정보 (이미지, 운영시간, 전화번호 등)
export async function getSpotCommonDetail(contentId: string) {
  const response = await fetchPetTour("detailCommon2", { contentId });
  return Array.isArray(response) ? response[0] : response;
}

export async function getSpotIntroDetail(
  contentId: string,
  contentTypeId: string,
) {
  const response = await fetchPetTour("detailIntro2", {
    contentId,
    contentTypeId,
  });
  return Array.isArray(response) ? response[0] : response;
}

export async function fetchRandomPetSpotsServer(count: number = 6) {
  const results = await Promise.allSettled(
    COURSE_CONTENT_TYPES.map(async (contentTypeId) => {
      const params = new URLSearchParams({
        serviceKey: API_KEY,
        MobileOS: "ETC",
        MobileApp: "PawTrip",
        _type: "json",
        numOfRows: "5",
        pageNo: "1",
        arrange: "R",
        contentTypeId,
      });

      const res = await fetch(`${PET_API_BASE}/areaBasedList2?${params}`, {
        next: { revalidate: 3600 },
      });
      const json = await res.json();

      const item = json.response?.body?.items?.item;
      return !item ? [] : Array.isArray(item) ? item : [item];
    }),
  );

  const all = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));

  return all.sort(() => Math.random() - 0.5).slice(0, count);
}
