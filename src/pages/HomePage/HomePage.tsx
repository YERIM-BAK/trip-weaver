"use client";

import Chip from "@/components/ui/Chip/Chip";
import SpotCard from "@/features/course/components/SpotCard/SpotCard";
import { getLocationBased } from "@/lib/tourapi";
import { useState, useRef, useCallback } from "react";

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
  const [history, setHistory] = useState<KakaoPlace[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    const q = searchQuery.trim();
    if (!q) return;

    setIsSearching(true);
    setSearchResults([]);

    try {
      const res = await fetch(
        `/api/places?query=${encodeURIComponent(q)}&size=5`
      );
      const data = await res.json();
      setSearchResults(data ?? []);
    } catch (e) {
      console.error("검색 실패", e);
    } finally {
      setIsSearching(false);
    }
  };

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
 
    setHistory((prev) => {
      const filtered = prev.filter((v) => v.id !== place.id);
      return [place, ...filtered].slice(0, 5);
    });
 
    fetchNearbySpots(place);
  };

  const handleClear = () => {
    setOrigin(null);
    setSearchQuery("");
    setSearchResults([]);
    setNearbySpots([]);
    searchRef.current?.focus();
  };

  const handleRemoveHistory = (id: string) => {
    setHistory((prev) => prev.filter((v) => v.id !== id));
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

        <div className="searchBox">
          <span className="searchBox__icon">📍</span>

          <input 
            className="searchBox__input"
            ref={searchRef}
            type="search"
            placeholder="출발 장소를 검색하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          {searchQuery && (
            <button
              type="button"
              className="searchBox__clear"
              aria-label="검색어 지우기"
              onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
                searchRef.current?.focus();
              }}
            >
              ✕
            </button>
          )}
          <button
            type="button"
            className="searchBox__action"
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? "검색 중..." : "검색🔍"}
          </button>
        </div>

        {history.length > 0 && (
          <ul className="chipList">
            {history.map((item) => (
              <li key={item.id}>
                <Chip
                  id={item.id}
                  label={item.place_name}
                  onClick={() => handleSelectOrigin(item)}
                  onClear={() => handleRemoveHistory(item.id)}
                />
              </li>
            ))}
          </ul>
        )}


        {searchResults.length > 0 && (
          <ul className="searchResultList">
            {searchResults.map((place) => (
              <li key={place.id} className="searchResultItem">
                <button
                  type="button"
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
      </section>

      {isFetchingNearby && (
        // 컴포넌트 만들어야함
        <p className="completeMsg">
          주변 여행지를 불러오는 중...
        </p>
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
                  <SpotCard  spot={mapToSpot(spot)} order={idx + 1} />
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