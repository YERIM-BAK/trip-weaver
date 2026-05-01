import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://apis.data.go.kr/B551011/KorService2";
const API_KEY = process.env.TOUR_API_KEY!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get("endpoint") ?? "areaBasedList2";

  const params = new URLSearchParams();
  params.set("serviceKey", API_KEY);
  params.set("MobileOS", "ETC");
  params.set("MobileApp", "PawTrip");
  params.set("_type", "json");

  searchParams.forEach((value, key) => {
    if (key !== "endpoint") params.set(key, value);
  });

  const res = await fetch(`${BASE_URL}/${endpoint}?${params}`);
  const text = await res.text();

  try {
    const json = JSON.parse(text);
    return NextResponse.json(json.response.body.items?.item ?? []);
  } catch {
    return NextResponse.json({ error: text }, { status: 500 });
  }
}
