"use client";

import Chip from "@/components/ui/Chip/Chip";
import Dropdown from "@/components/ui/Dropdown/Dropdown";
import Skeleton from "@/components/ui/Skeleton/Skeleton";
import { AREA_CODES, CONTENT_TYPE_MAP } from "@/constants/tour";
import SpotCard from "@/features/course/components/SpotCard/SpotCard";
import { useSpots } from "@/features/course/hooks/useSpots";
import { mapPetSpot } from "@/lib/petTour/petTour.utils";
import { useState } from "react";

const categoryOptions = [
  { id: "all", label: "전체", value: "" },
  ...Object.entries(CONTENT_TYPE_MAP).map(([code, name]) => ({
    id: code,
    label: name,
    value: code,
  })),
];

export default function SpotsPage() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { spots, isPending } = useSpots({
    areaCode: selectedRegion,
    contentTypeId: selectedCategory,
  });

  const regionOptions = AREA_CODES.map((r) => ({
    label: r.name,
    value: r.code,
  }));
  return (
    <section className="section">
      <Dropdown
        options={regionOptions}
        value={selectedRegion}
        onChange={setSelectedRegion}
        placeholder="지역 선택"
      />

      <div className="chipList">
        {categoryOptions.map((cat) => (
          <Chip
            key={cat.id}
            id={cat.id}
            label={cat.label}
            isActive={selectedCategory === cat.value}
            onClick={() => setSelectedCategory(cat.value)}
          />
        ))}
      </div>

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
