// src/lib/petTour/petTourApi.server.ts
import { COURSE_CONTENT_TYPES } from "@/constants/tour";

const PET_API_BASE = "https://apis.data.go.kr/B551011/KorPetTourService2";
const API_KEY = process.env.TOUR_API_KEY!;

async function fetchPetTourServer(
  endpoint: string,
  params: Record<string, string>,
) {
  const query = new URLSearchParams({
    serviceKey: API_KEY,
    MobileOS: "ETC",
    MobileApp: "PawTrip",
    _type: "json",
    ...params,
  });

  const res = await fetch(`${PET_API_BASE}/${endpoint}?${query}`, {
    next: { revalidate: 3600 },
  });
  const json = await res.json();
  const item = json.response?.body?.items?.item;
  return !item ? [] : Array.isArray(item) ? item : [item];
}

export async function getSpotCommonDetailServer(contentId: string) {
  const response = await fetchPetTourServer("detailCommon2", { contentId });
  return response[0] ?? null;
}

export async function getPetTourInfoServer(contentId: string) {
  const response = await fetchPetTourServer("detailPetTour2", { contentId });
  return response[0] ?? null;
}

export async function getSpotIntroDetailServer(
  contentId: string,
  contentTypeId: string,
) {
  const response = await fetchPetTourServer("detailIntro2", {
    contentId,
    contentTypeId,
  });
  return response[0] ?? null;
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
