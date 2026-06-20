"use client";

import { useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import FeedbackMessage from "@/components/ui/FeedbackMessage/FeedbackMessage";
import SpotCard from "@/features/spot/components/SpotCard/SpotCard";
import { PetSpot } from "@/lib/petTour/petTour.types";
import { getPetFriendlyNearby } from "@/lib/petTour/petTourApi";
import { useState } from "react";
import Skeleton from "@/components/ui/Skeleton/Skeleton";
import { mapPetSpot } from "@/lib/petTour/petTour.utils";

// const mapToSpot = (spot: PetSpot) => ({
//   id: spot.contentid,
//   name: spot.title,
//   address: spot.addr1,
//   description: spot.petInfo ?? "",
//   duration: `${Math.round(Number(spot.dist) / 70)}분`,
//   category: CONTENT_TYPE_MAP[spot.contenttypeid] ?? "",
//   image: spot.firstimage ?? spot.firstimage2 ?? null,
//   lat: Number(spot.mapy),
//   lng: Number(spot.mapx),
// });

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const name = searchParams?.get("name");
  const lat = searchParams?.get("lat");
  const lng = searchParams?.get("lng");

  const [nearbySpots, setNearbySpots] = useState<PetSpot[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!lat || !lng) return;

    startTransition(async () => {
      setHasSearched(false);
      setNearbySpots([]);

      try {
        const data = await getPetFriendlyNearby(Number(lat), Number(lng));
        setNearbySpots(data ?? []);
      } catch (e) {
        console.error("주변 검색 실패", e);
      } finally {
        setHasSearched(true);
      }
    });
  }, [lat, lng]);

  return (
    <section className="section">
      <h2 className="sectionTitle">
        {name ? `${name} 주변 여행지` : "주변 여행지"}
      </h2>
      {isPending && (
        <div className="skeletonWrap">
          <Skeleton height={200} rounded="lg" />
          <Skeleton height={200} rounded="lg" />
          <Skeleton height={200} rounded="lg" />
        </div>
      )}

      {!isPending && nearbySpots.length > 0 && (
        <div>
          <ul className="spotCardList">
            {nearbySpots.map((spot, idx) => (
              <li key={spot.contentid}>
                <SpotCard spot={mapPetSpot(spot)} order={idx + 1} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {!isPending && !lat && (
        <FeedbackMessage status="error" title="검색어를 입력해주세요." />
      )}
      {!isPending && hasSearched && nearbySpots.length === 0 && (
        <FeedbackMessage
          status="error"
          title="주변에 반려동물 동반 가능한 여행지가 없어요."
        />
      )}
    </section>
  );
}
