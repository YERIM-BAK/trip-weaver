"use client";

import SpotCard from "@/features/course/components/SpotCard/SpotCard";
import { TourSpot } from "@/features/course/course.types";
import SearchBox from "@/features/search/components/SearchBox";
import SearchResults from "@/features/search/components/SearchResults";
import { KakaoPlace } from "@/features/search/search.types";
import { getLocationBased } from "@/lib/tourapi";
import { useState, useRef, useCallback } from "react";

const mapToSpot = (spot: TourSpot) => ({
  id: spot.contentid,
  name: spot.title,
  address: spot.addr1,
  description: "",
  duration: `${Math.round(Number(spot.dist) / 70)}분`,
  category: "",
  lat: Number(spot.mapy),
  lng: Number(spot.mapx),
});

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<KakaoPlace[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [origin, setOrigin] = useState<KakaoPlace | null>(null);
  const [nearbySpots, setNearbySpots] = useState<TourSpot[]>([]);
  const [isFetchingNearby, setIsFetchingNearby] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  

  const handleSearch = useCallback(async () => {
    const q = searchQuery.trim();
    if (!q) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`/api/places?query=${encodeURIComponent(q)}&size=5`);
      const data = await res.json();
      setSearchResults(data ?? []);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery]);

  const fetchNearbySpots = useCallback(async (place: KakaoPlace) => {
    setIsFetchingNearby(true);
    setNearbySpots([]);
    try {
      const data = await getLocationBased(place.y, place.x);
      setNearbySpots(data ?? []);
    } catch (e) {
      console.error("주변 검색 실패", e);
    } finally {
      setIsFetchingNearby(false);
    }
  }, []);

  const handleSelectOrigin = (place: KakaoPlace) => {
    setOrigin(place);
    setSearchResults([]);
    setSearchQuery(place.place_name);
    fetchNearbySpots(place);
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
        <h2 className="sectionTitle">
          <span className="dot" aria-hidden="true" />
          어디서 출발할까요?
        </h2>

        <div className="originBadgeBox">
          <span className="originBadgeTitle">출발지</span>
          {origin && (
            <div className="originBadge">
              <span>{origin.place_name}</span>
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
        </div>

        <SearchBox
          value={searchQuery}
          placeholder="출발 장소를 검색하세요"
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          isSearching={isSearching}
        />

        {searchResults.length > 0 && (
          <SearchResults
            results={searchResults}
            isSearching={isSearching}
            onSelect={handleSelectOrigin}
          />
        )}
      </section>

      {isFetchingNearby && (
        // 컴포넌트 만들어야함
        <p className="completeMsg">주변 여행지를 불러오는 중...</p>
      )}

      <section className="section">
        {!isFetchingNearby && nearbySpots.length > 0 && (
          <div>
            <h2 className="sectionTitle">
              <span className="dot" aria-hidden="true" />
              주변 여행지
            </h2>
            <ul className="spotCardList">
              {nearbySpots.map((spot, idx) => (
                <li key={spot.contentid}>
                  <SpotCard spot={mapToSpot(spot)} order={idx + 1} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {!isFetchingNearby && origin && nearbySpots.length === 0 && (
        <p className="completeMsg">주변 관광지를 찾지 못했어요.</p>
      )}
    </div>
  );
}

export default HomePage;