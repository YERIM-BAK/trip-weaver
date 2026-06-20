"use client";
import { AREA_CODES } from "@/constants/tour";
import Chip from "@/components/ui/Chip/Chip";
import { useState } from "react";
import { usePopularPetSpots } from "@/lib/petTour/usePopularPetSpots";
import Skeleton from "@/components/ui/Skeleton/Skeleton";
import FeedbackMessage from "@/components/ui/FeedbackMessage/FeedbackMessage";
import SpotCard from "@/features/spot/components/SpotCard/SpotCard";
import { mapPetSpot } from "@/lib/petTour/petTour.utils";

export default function PopularPage({}) {
  const [selectedArea, setSelectedArea] = useState("");
  const { spots: popularSpots, loading: isLoadingPopular } =
    usePopularPetSpots(selectedArea);

  return (
    <section className="section">
      <h2 className="sectionTitle">
        <span className="dot" aria-hidden="true" />
        인기 반려동물 관광지
      </h2>

      <div className="chipList">
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
              <SpotCard spot={mapPetSpot(spot)} />
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
