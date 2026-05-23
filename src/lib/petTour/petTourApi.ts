import { PetSpot } from "./petTour.types";

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
