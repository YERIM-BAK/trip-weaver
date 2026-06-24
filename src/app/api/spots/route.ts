import { NextResponse } from "next/server";
import { getSpotCommonDetailServer } from "@/lib/petTour/petTourApi.server";

export async function POST(req: Request) {
  const { ids } = (await req.json()) as { ids: string[] };

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ spots: [] });
  }

  const results = await Promise.all(
    ids.map(async (id) => {
      const common = await getSpotCommonDetailServer(id);
      if (!common) return null;
      return {
        contentid: id,
        title: common.title ?? "",
        addr1: common.addr1 ?? "",
        contenttypeid: common.contenttypeid ?? "",
        firstimage: common.firstimage ?? "",
        firstimage2: "",
      };
    }),
  );

  return NextResponse.json({ spots: results.filter(Boolean) });
}
