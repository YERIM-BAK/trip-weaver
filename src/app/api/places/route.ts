import { NextRequest, NextResponse } from "next/server";

const KAKAO_REST_KEY = process.env.KAKAO_REST_API_KEY!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const size = searchParams.get("size") ?? "5";

  if (!query) {
    return NextResponse.json({ error: "query 파라미터가 필요해요" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=${size}`,
      { headers: { Authorization: `KakaoAK ${KAKAO_REST_KEY}` } }
    );

    if (!res.ok) throw new Error(`카카오 API 실패: ${res.status}`);

    const data = await res.json();
    return NextResponse.json(data.documents ?? []);
  } catch (err) {
    console.error("카카오 장소 검색 에러:", err);
    return NextResponse.json({ error: "장소 검색에 실패했어요" }, { status: 500 });
  }
}