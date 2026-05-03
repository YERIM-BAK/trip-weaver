"use client";

import dynamic from "next/dynamic";
import { MapProps } from "./Map.types";

type MapProvider = "kakao" | "google";

const MAP_PROVIDER: MapProvider =
  (process.env.NEXT_PUBLIC_MAP_PROVIDER as MapProvider) ?? "kakao";

// 카카오맵은 SSR 불가 → dynamic import로 클라이언트에서만 로드
const KakaoMap = dynamic(() => import("./providers/KakaoMap"), { ssr: false });
// const GoogleMap = dynamic(() => import("./providers/GoogleMap"), { ssr: false });

function Map(props: MapProps) {
  if (MAP_PROVIDER === "kakao") return <KakaoMap {...props} />;
  // if (MAP_PROVIDER === "google") return <GoogleMap {...props} />;

  return null;
}

export default Map;
