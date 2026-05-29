"use client";
import { AREA_CODES, CONTENT_TYPE_MAP } from "@/constants/tour";
import Chip from "@/components/ui/Chip/Chip";
import { useState } from "react";
import { usePopularPetSpots } from "@/lib/petTour/usePopularPetSpots";
import Skeleton from "@/components/ui/Skeleton/Skeleton";
import FeedbackMessage from "@/components/ui/FeedbackMessage/FeedbackMessage";
import { PetSpot } from "@/lib/petTour/petTour.types";
import SpotCard from "@/features/course/components/SpotCard/SpotCard";

export default function PopularPage({}) {
  const [selectedArea, setSelectedArea] = useState("");
  const { spots: popularSpots, loading: isLoadingPopular } =
    usePopularPetSpots(selectedArea);

  const mapPopularSpotToSpot = (spot: PetSpot) => ({
    id: spot.contentid,
    name: spot.title,
    address: spot.addr1,
    description: spot.petInfo ?? "",
    category: CONTENT_TYPE_MAP[spot.contenttypeid] ?? "",
    image: spot.firstimage ?? spot.firstimage2 ?? null,
  });

  return (
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
        <div className="skeletonWrap">
          <Skeleton width="100%" height={180} rounded="lg" />
          <Skeleton width="100%" height={180} rounded="lg" />
        </div>
      )}

      {!isLoadingPopular && popularSpots.length > 0 && (
        <ul className="spotCardList">
          {popularSpots.map((spot, idx) => (
            <li key={spot.contentid}>
              <SpotCard spot={mapPopularSpotToSpot(spot)} />
            </li>
          ))}
        </ul>
      )}

      {!isLoadingPopular && popularSpots.length === 0 && (
        <FeedbackMessage
          status="error"
          title="해당 지역의 반려동물 관광지가 없어요."
        />
      )}
    </section>
  );
}
