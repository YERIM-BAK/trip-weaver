"use client";

import Dropdown from "@/components/ui/Dropdown/Dropdown";
import Skeleton from "@/components/ui/Skeleton/Skeleton";
import { AREA_CODES } from "@/constants/tour";
import SpotCard from "@/features/course/components/SpotCard/SpotCard";
import { useSpots } from "@/features/course/hooks/useSpots";
import { mapPetSpot } from "@/lib/petTour/petTour.utils";
import { useState } from "react";

export default function WalkPage() {
  const [selectedRegion, setSelectedRegion] = useState("");

  const { spots, isPending } = useSpots({
    areaCode: selectedRegion,
    contentTypeId: "28",
    cat1: "A03",
    cat2: "A0302",
  });

  const regionOptions = AREA_CODES.map((r) => ({
    label: r.name,
    value: r.code,
  }));

  return (
    <section className="section">
      <h2 className="sectionTitle">반려동물 동반 산책로</h2>

      <Dropdown
        options={regionOptions}
        value={selectedRegion}
        onChange={setSelectedRegion}
        placeholder="지역 선택"
      />

      {isPending ? (
        <div className="skeletonWrap">
          <Skeleton height={200} rounded="lg" />
          <Skeleton height={200} rounded="lg" />
          <Skeleton height={200} rounded="lg" />
        </div>
      ) : (
        <ul className="spotCardList">
          {spots.map((item) => (
            <li key={item.contentid}>
              <SpotCard spot={mapPetSpot(item)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
