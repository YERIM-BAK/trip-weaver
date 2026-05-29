// AI 연결용
import { CONTENT_TYPE_MAP } from "@/constants/tour";
import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY!;

export async function POST(req: NextRequest) {
  const { regionName, spots } = await req.json();

  const grouped: Record<string, string[]> = {};
  for (const s of spots) {
    const label = CONTENT_TYPE_MAP[s.contenttypeid] ?? "기타";
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(`${s.title} (${s.addr1 ?? ""})`);
  }

  const spotsText = Object.entries(grouped)
    .map(([type, list]) => `[${type}]\n${list.slice(0, 8).join("\n")}`)
    .join("\n\n");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `당신은 반려동물 동반 여행 전문 코스 플래너입니다.

아래는 한국관광공사 API에서 가져온 "${regionName}" 지역의 반려동물 동반 가능 실제 시설 목록입니다.

${spotsText}

이 목록에서 실제 장소만 선택해 당일치기 여행 코스 3개를 만들어주세요.
반드시 목록에 있는 실제 장소명을 그대로 사용하고, 없는 장소를 추가하지 마세요.
각 코스는 관광지/카페/식당/숙박 등 다양한 유형을 섞어 구성하세요.

JSON만 응답 (마크다운 없이):
{
  "courses": [
    {
      "id": "c1",
      "title": "코스 제목",
      "theme": "테마",
      "duration": "소요시간",
      "petScore": 88,
      "summary": "코스 한줄 소개",
      "spots": [
        {
          "name": "목록에 있는 실제 장소명 그대로",
          "type": "관광지 또는 음식점 등",
          "stayTime": "1-2시간",
          "tip": "반려동물 관련 짧은 팁"
        }
      ]
    }
  ]
}`,
        },
      ],
    }),
  });

  const data = await res.json();
  const text = data.content?.[0]?.text ?? "{}";
  const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
  return NextResponse.json(parsed.courses ?? []);
}
