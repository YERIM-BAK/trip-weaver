"use client";

import { getLocationBased } from "@/lib/tourapi";
import { useState, useRef } from "react";

const KAKAO_REST_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY ?? "";

interface KakaoPlace {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string; // lng
  y: string; // lat
}

interface TourSpot {
  contentid: string;
  title: string;
  addr1: string;
  firstimage: string;
  dist: string;
  contenttypeid: string;
  mapx: string;
  mapy: string;
}

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<KakaoPlace[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [origin, setOrigin] = useState<KakaoPlace | null>(null);
  const [nearbySpots, setNearbySpots] = useState<TourSpot[]>([]);
  const [isFetchingNearby, setIsFetchingNearby] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    const q = searchQuery.trim();
    if (!q) return;

    setIsSearching(true);
    setSearchResults([]);

    try {
      const res = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(q)}&size=5`,
        { headers: { Authorization: `KakaoAK ${KAKAO_REST_KEY}` } },
      );
      const data = await res.json();
      setSearchResults(data.documents ?? []);
    } catch (e) {
      console.error("검색 실패", e);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectOrigin = async (place: KakaoPlace) => {
    setOrigin(place);
    setSearchResults([]);
    setSearchQuery(place.place_name);
    setNearbySpots([]);
    setIsFetchingNearby(true);

    try {
      const data = await getLocationBased(place.y, place.x);
      setNearbySpots(data ?? []);
    } catch (e) {
      console.error("주변 검색 실패", e);
    } finally {
      setIsFetchingNearby(false);
    }
  };

  const handleClear = () => {
    setOrigin(null);
    setSearchQuery("");
    setSearchResults([]);
    setNearbySpots([]);
    searchRef.current?.focus();
  };

  return (
    <div className="homePage">
      <section className="section">
        <h2 className="sectionLabel">
          <span className="dot" aria-hidden="true" />
          어디서 출발할까요?
        </h2>

        <div className="searchRow">
          <input
            ref={searchRef}
            type="search"
            className="searchInput"
            placeholder="출발 장소를 검색하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            type="button"
            className="searchBtn"
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? "검색 중..." : "검색"}
          </button>
        </div>

        {/* 카카오 검색 결과 드롭다운 */}
        {searchResults.length > 0 && (
          <ul className="searchResultList" role="listbox" aria-label="검색 결과">
            {searchResults.map((place) => (
              <li key={place.id} role="option" aria-selected={false}>
                <button
                  type="button"
                  className="searchResultItem"
                  onClick={() => handleSelectOrigin(place)}
                >
                  <span className="placeName">{place.place_name}</span>
                  <span className="placeAddress">
                    {place.road_address_name || place.address_name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* 선택된 출발지 */}
        {origin && (
          <div className="originBadge">
            <span>📍 {origin.place_name}</span>
            <button
              type="button"
              className="clearBtn"
              aria-label="출발지 초기화"
              onClick={handleClear}
            >
              ✕
            </button>
          </div>
        )}
      </section>

      {/* 주변 여행지 리스트 */}
      {isFetchingNearby && (
        <p className="nearbyStatus" aria-live="polite">
          주변 여행지를 불러오는 중...
        </p>
      )}

      {!isFetchingNearby && nearbySpots.length > 0 && (
        <section className="section">
          <h2 className="sectionLabel">
            <span className="dot" aria-hidden="true" />
            주변 여행지
          </h2>
          <ul className="nearbyList" role="list">
            {nearbySpots.map((spot) => (
              <li key={spot.contentid} className="nearbyItem">
                <span className="nearbyName">{spot.title}</span>
                <span className="nearbyAddress">{spot.addr1}</span>
                <span className="nearbyDist">{Math.round(Number(spot.dist))}m</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!isFetchingNearby && origin && nearbySpots.length === 0 && (
        <p className="nearbyStatus">주변 관광지를 찾지 못했어요.</p>
      )}
    </div>
  );
}

export default HomePage;