import {
  FetchPopularSpotsOptions,
  FetchPopularSpotsResult,
  PetSpot,
} from "./petTour.types";

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
  radius: number = 10000,
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
  return fetchPetTour("detailPetTour2", { contentId });
}

export async function fetchPopularPetSpots({
  areaCode = "",
  numOfRows = 10,
  pageNo = 1,
  contentTypeId = "12",
}: FetchPopularSpotsOptions = {}): Promise<FetchPopularSpotsResult> {
  const params: Record<string, string> = {
    numOfRows: String(numOfRows),
    pageNo: String(pageNo),
    arrange: "P", // P = 인기순 (조회수+추천수)
    contentTypeId,
  };

  if (areaCode) params.areaCode = areaCode;

  const response = await fetchPetTour("areaBasedList2", params);
  const spots: PetSpot[] = Array.isArray(response)
    ? response
    : (response?.items ?? []);

  return { spots, totalCount: response?.totalCount ?? spots.length };
}

// 지역 기반 반려동물 동반 가능 시설 (petTourYN=Y 필터)
export async function fetchPetFriendlyByArea({
  areaCode,
  contentTypeId = "12",
  numOfRows = 30,
  pageNo = 1,
}: {
  areaCode: string;
  contentTypeId?: string;
  numOfRows?: number;
  pageNo?: number;
}): Promise<FetchPopularSpotsResult> {
  const response = await fetchPetTour("areaBasedList2", {
    areaCode,
    contentTypeId,
    numOfRows: String(numOfRows),
    pageNo: String(pageNo),
    arrange: "A",
    petTourYN: "Y", // 핵심 필터
  });

  const spots: PetSpot[] = Array.isArray(response)
    ? response
    : (response?.items ?? []);

  return { spots, totalCount: response?.totalCount ?? spots.length };
}

// 공통 상세 정보 (이미지, 운영시간, 전화번호 등)
export async function getSpotCommonDetail(contentId: string) {
  return fetchPetTour("detailCommon2", {
    contentId,
    defaultYN: "Y",
    firstImageYN: "Y",
    addrinfoYN: "Y",
    mapinfoYN: "Y",
    overviewYN: "Y",
  });
}

export async function fetchRandomPetSpotsServer(count: number = 6) {
  const params = new URLSearchParams({
    serviceKey: API_KEY,
    MobileOS: "ETC",
    MobileApp: "PawTrip",
    _type: "json",
    numOfRows: "30",
    pageNo: "1",
    arrange: "R",
  });

  const res = await fetch(`${PET_API_BASE}/areaBasedList2?${params}`);
  const json = await res.json();
  const item = json.response?.body?.items?.item;
  const items = !item ? [] : Array.isArray(item) ? item : [item];
  return items.slice(0, count);
}
