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

async function fetchFirstItem(
  endpoint: string,
  params: Record<string, string>,
) {
  const response = await fetchPetTourServer(endpoint, params);
  return response[0] ?? null;
}

export async function getSpotCommonDetailServer(contentId: string) {
  return fetchFirstItem("detailCommon2", { contentId });
}

export async function getPetTourInfoServer(contentId: string) {
  return fetchFirstItem("detailPetTour2", { contentId });
}

export async function getSpotIntroDetailServer(
  contentId: string,
  contentTypeId: string,
) {
  return fetchFirstItem("detailIntro2", { contentId, contentTypeId });
}

export async function getSpotInfoServer(
  contentId: string,
  contentTypeId: string,
) {
  return fetchPetTourServer("detailInfo2", { contentId, contentTypeId });
}

export async function getSpotImagesServer(contentId: string) {
  return fetchPetTourServer("detailImage2", { contentId });
}

export async function fetchRandomPetSpotsServer(count: number = 6) {
  const results = await Promise.allSettled(
    COURSE_CONTENT_TYPES.map((contentTypeId) =>
      fetchPetTourServer("areaBasedList2", {
        numOfRows: "5",
        pageNo: "1",
        arrange: "R",
        contentTypeId,
      }),
    ),
  );

  const all = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
  return all.sort(() => Math.random() - 0.5).slice(0, count);
}
