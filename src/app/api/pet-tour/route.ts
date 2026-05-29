import { NextRequest, NextResponse } from "next/server";

const TOUR_API_BASE = "https://apis.data.go.kr/B551011/KorService1";
const PET_API_BASE = "https://apis.data.go.kr/B551011/KorPetTourService2";
const API_KEY = process.env.TOUR_API_KEY!;

// KorService1 전용 엔드포인트
const TOUR_ENDPOINTS = ["detailCommon2", "areaBasedList1"];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get("endpoint") ?? "areaBasedList2";

  const BASE_URL = TOUR_ENDPOINTS.includes(endpoint)
    ? TOUR_API_BASE
    : PET_API_BASE;

  const params = new URLSearchParams();
  params.set("serviceKey", API_KEY);
  params.set("MobileOS", "ETC");
  params.set("MobileApp", "PawTrip");
  params.set("_type", "json");

  searchParams.forEach((value, key) => {
    if (key !== "endpoint") params.set(key, value);
  });

  const res = await fetch(`${BASE_URL}/${endpoint}?${params}`);
  const json = await res.json();

  console.log("raw item:", json.response.body.items?.item);
  console.log(
    "type:",
    Array.isArray(json.response.body.items?.item)
      ? "배열"
      : typeof json.response.body.items?.item,
  );

  const item = json.response.body.items?.item;
  const items = !item ? [] : Array.isArray(item) ? item : [item];

  return NextResponse.json(items);
}
