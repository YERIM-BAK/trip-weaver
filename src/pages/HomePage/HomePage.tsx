"use client";

import CategoryMenu from "@/components/ui/CategoryMenu/CategoryMenu";
import Chip from "@/components/ui/Chip/Chip";
import FeedbackMessage from "@/components/ui/FeedbackMessage/FeedbackMessage";
import LoadingOverlay from "@/components/ui/LoadingOverlay/LoadingOverlay";
import Skeleton from "@/components/ui/Skeleton/Skeleton";
import CardSwiper from "@/components/ui/Swiper/CardSwiper";
import { CONTENT_TYPE_MAP } from "@/constants/tour";
import SpotCard from "@/features/course/components/SpotCard/SpotCard";
import { TourSpot } from "@/features/course/course.types";
import SearchBox from "@/features/search/components/SearchBox";
import SearchResults from "@/features/search/components/SearchResults";
import { useSearch } from "@/features/search/hooks/useSearch";
import { KakaoPlace } from "@/features/search/search.types";
import { PetSpot } from "@/lib/petTour/petTour.types";
import { getPetFriendlyNearby } from "@/lib/petTour/petTourApi";

import { useState, useRef, useCallback } from "react";

const mapToSpot = (spot: PetSpot) => ({
  id: spot.contentid,
  name: spot.title,
  address: spot.addr1,
  description: spot.petInfo ?? "", // 반려동물 정보 활용
  duration: `${Math.round(Number(spot.dist) / 70)}분`,
  category: CONTENT_TYPE_MAP[spot.contenttypeid] ?? "",
  image: spot.firstimage ?? spot.firstimage2 ?? null,
  lat: Number(spot.mapy),
  lng: Number(spot.mapx),
});

function HomePage() {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearching,
    handleSearch,
    clearSearch,
    isSearchOpen,
    handleFocus,
    handleBlur,
  } = useSearch();

  const [origin, setOrigin] = useState<KakaoPlace | null>(null);
  const [nearbySpots, setNearbySpots] = useState<PetSpot[]>([]);
  const [isFetchingNearby, setIsFetchingNearby] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [courseSpotIds, setCourseSpotIds] = useState<string[]>([]);

  const handleAddToCourse = (id: string) => {
    setCourseSpotIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const fetchNearbyPetSpots = useCallback(async (place: KakaoPlace) => {
    setIsFetchingNearby(true);
    setNearbySpots([]);
    try {
      const data = await getPetFriendlyNearby(Number(place.y), Number(place.x));
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
    fetchNearbyPetSpots(place);
  };

  const handleClear = () => {
    setOrigin(null);
    clearSearch();
    setNearbySpots([]);
    searchRef.current?.focus();
  };

  return (
    <div className="homePage">
      <section className="section">
        <h2 className="sectionTitle">오늘은 어디로 떠나볼까요?</h2>

        {/* <div className="originBadgeBox">
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
        </div> */}

        <div className="search-wrap">
          <SearchBox
            value={searchQuery}
            placeholder="어디로 떠날지 검색해보세요"
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
            isSearching={isSearching}
          />

          {(isSearchOpen || searchResults.length > 0) && (
            <SearchResults
              results={searchResults}
              isSearching={isSearching}
              onSelect={handleSelectOrigin}
            />
          )}
        </div>
      </section>

      <section className="section">
        <CategoryMenu />
      </section>

      <section className="section">
        {isFetchingNearby && (
          <LoadingOverlay message="주변 여행지를 불러오는 중..." />
        )}
        {!isFetchingNearby && nearbySpots.length > 0 && (
          <div>
            <h2 className="sectionTitle">
              <span className="dot" aria-hidden="true" />
              주변 여행지
            </h2>
            <ul className="spotCardList">
              {nearbySpots.map((spot, idx) => (
                <li key={spot.contentid}>
                  <SpotCard
                    spot={mapToSpot(spot)}
                    order={idx + 1}
                    isAdded={courseSpotIds.includes(spot.contentid)}
                    onAddToCourse={() => handleAddToCourse(spot.contentid)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        {!isFetchingNearby && origin && nearbySpots.length === 0 && (
          <FeedbackMessage
            status="error"
            title="주변에 반려동물 동반 가능한 여행지가 없어요."
          />
        )}
      </section>
    </div>
  );
}

export default HomePage;
