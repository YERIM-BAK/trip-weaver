"use client";

import CategoryMenu from "@/components/ui/CategoryMenu/CategoryMenu";
import Skeleton from "@/components/ui/Skeleton/Skeleton";
import { CONTENT_TYPE_MAP } from "@/constants/tour";
import SpotCard from "@/features/course/components/SpotCard/SpotCard";
import SearchBox from "@/features/search/components/SearchBox";
import SearchResults from "@/features/search/components/SearchResults";
import { useSearch } from "@/features/search/hooks/useSearch";
import { KakaoPlace } from "@/features/search/search.types";
import { PetSpot } from "@/lib/petTour/petTour.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const randomSpot = (spot: PetSpot) => ({
  id: spot.contentid,
  name: spot.title,
  address: spot.addr1,
  category: CONTENT_TYPE_MAP[spot.contenttypeid] ?? "",
  image: spot.firstimage ?? spot.firstimage2 ?? null,
});

interface Props {
  initialSpots: PetSpot[];
}

function HomePage({ initialSpots }: Props) {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearching,
    handleSearch,
    isSearchOpen,
    handleFocus,
    handleBlur,
  } = useSearch();

  const [spots] = useState<PetSpot[]>(initialSpots);

  const handleSelectOrigin = (place: KakaoPlace) => {
    setSearchResults([]);
    setSearchQuery(place.place_name);
    router.push(
      `/explore?name=${encodeURIComponent(place.place_name)}&lat=${place.y}&lng=${place.x}`,
    );
  };

  return (
    <div className="homePage">
      <section className="section">
        <h2 className="sectionTitle">오늘은 어디로 떠나볼까요?</h2>
        <div className="search-wrap">
          <SearchBox
            value={searchQuery}
            placeholder="어디로 떠날지 검색해보세요"
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={() => handleSearch(searchQuery)}
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
        <div className="titleWrap">
          <h2 className="sectionTitle">반려동물과 함께 가기 좋은 곳</h2>
          <Link href="" className="link-btn">
            <span className="link-btn-text">더보기</span>
          </Link>
        </div>
        {spots.length === 0 ? (
          <div className="skeletonWrap">
            <Skeleton height={200} rounded="lg" />
            <Skeleton height={200} rounded="lg" />
            <Skeleton height={200} rounded="lg" />
          </div>
        ) : (
          <ul className="spotCardList">
            {spots.map((item) => (
              <li key={item.contentid}>
                <SpotCard spot={randomSpot(item)} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default HomePage;
