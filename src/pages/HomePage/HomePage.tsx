"use client";

import Chip from "@/components/ui/Chip/Chip";
import FeedbackMessage from "@/components/ui/FeedbackMessage/FeedbackMessage";
import LoadingOverlay from "@/components/ui/LoadingOverlay/LoadingOverlay";
import CardSwiper from "@/components/ui/Swiper/CardSwiper";
import SpotCard from "@/features/course/components/SpotCard/SpotCard";
import { TourSpot } from "@/features/course/course.types";
import SearchBox from "@/features/search/components/SearchBox";
import SearchResults from "@/features/search/components/SearchResults";
import { useSearch } from "@/features/search/hooks/useSearch";
import { KakaoPlace } from "@/features/search/search.types";
import { PetSpot } from "@/lib/petTour/petTour.types";
import { getPetFriendlyNearby } from "@/lib/petTour/petTourApi";
import { usePopularPetSpots } from "@/lib/petTour/usePopularPetSpots";

import { useState, useRef, useCallback } from "react";

const AREA_CODES = [
  { code: "", name: "전국" },
  { code: "1", name: "서울" },
  { code: "2", name: "인천" },
  { code: "3", name: "대전" },
  { code: "4", name: "대구" },
  { code: "5", name: "광주" },
  { code: "6", name: "부산" },
  { code: "7", name: "울산" },
  { code: "8", name: "세종" },
  { code: "31", name: "경기" },
  { code: "32", name: "강원" },
  { code: "33", name: "충북" },
  { code: "34", name: "충남" },
  { code: "35", name: "경북" },
  { code: "36", name: "경남" },
  { code: "37", name: "전북" },
  { code: "38", name: "전남" },
  { code: "39", name: "제주" },
];

const CONTENT_TYPE_MAP: Record<string, string> = {
  "12": "관광지",
  "14": "문화시설",
  "15": "축제/행사",
  "28": "레포츠",
  "32": "숙박",
  "38": "쇼핑",
  "39": "음식점",
};

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

const mapPopularSpotToSpot = (spot: PetSpot) => ({
  id: spot.contentid,
  name: spot.title,
  address: spot.addr1,
  description: spot.petInfo ?? "",
  category: CONTENT_TYPE_MAP[spot.contenttypeid] ?? "",
  image: spot.firstimage ?? spot.firstimage2 ?? null,
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
  const [selectedArea, setSelectedArea] = useState("");

  // 인기 관광지 훅
  const { spots: popularSpots, loading: isLoadingPopular } =
    usePopularPetSpots(selectedArea);

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

        <div className="search-wrap">
          <SearchBox
            value={searchQuery}
            placeholder="출발 장소를 검색하세요"
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

      <section className="section">
        <h2 className="sectionTitle">
          <span className="dot" aria-hidden="true" />
          인기 반려동물 관광지
        </h2>

        <div className="chip-list">
          {AREA_CODES.map((area) => (
            <Chip
              key={area.code}
              id={area.code}
              label={area.name}
              onClick={() => setSelectedArea(area.code)}
              isActive={selectedArea === area.code}
            />
          ))}
        </div>

        {isLoadingPopular && (
          <LoadingOverlay message="인기 관광지를 불러오는 중..." />
        )}

        {!isLoadingPopular && popularSpots.length > 0 && (
          // <ul className="spotCardList type-row">
          //   {popularSpots.map((spot, idx) => (
          //     <li key={spot.contentid}>
          //       <SpotCard
          //         spot={mapPopularSpotToSpot(spot)}
          //         order={idx + 1}
          //         isAdded={courseSpotIds.includes(spot.contentid)}
          //         onAddToCourse={() => handleAddToCourse(spot.contentid)}
          //       />
          //     </li>
          //   ))}
          // </ul>
          <CardSwiper
            items={popularSpots}
            keyExtractor={(spot) => spot.contentid}
            className="cardSwiperList"
            renderItem={(spot, idx) => (
              <SpotCard
                className=""
                spot={mapPopularSpotToSpot(spot)}
                order={idx + 1}
                isAdded={courseSpotIds.includes(spot.contentid)}
                onAddToCourse={() => handleAddToCourse(spot.contentid)}
              />
            )}
          />
        )}

        {!isLoadingPopular && popularSpots.length === 0 && (
          <FeedbackMessage
            status="error"
            title="해당 지역의 반려동물 관광지가 없어요."
          />
        )}
      </section>
    </div>
  );
}

export default HomePage;
