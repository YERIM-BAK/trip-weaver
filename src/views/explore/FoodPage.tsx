"use client";

import Chip from "@/components/ui/Chip/Chip";
import Dropdown from "@/components/ui/Dropdown/Dropdown";
import Skeleton from "@/components/ui/Skeleton/Skeleton";
import { AREA_CODES } from "@/constants/tour";
import SpotCard from "@/features/course/components/SpotCard/SpotCard";
import { useSpots } from "@/features/course/hooks/useSpots";
import { mapPetSpot } from "@/lib/petTour/petTour.utils";
import { useState } from "react";

const foodCategories = [
  { id: "all", label: "전체", cat3: "" },
  { id: "korean", label: "한식", cat3: "A05020100" },
  { id: "western", label: "양식", cat3: "A05020200" },
  { id: "cafe", label: "카페", cat3: "A05020900" },
];

export default function FoodPage() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCat3, setSelectedCat3] = useState("");

  const { spots, isPending } = useSpots({
    areaCode: selectedRegion,
    contentTypeId: "39",
    cat1: "A05",
    cat2: "A0502",
    cat3: selectedCat3,
  });

  const regionOptions = AREA_CODES.map((r) => ({
    label: r.name,
    value: r.code,
  }));

  return (
    <section className="section">
      <h2 className="sectionTitle">반려동물 동반 음식점</h2>

      <Dropdown
        options={regionOptions}
        value={selectedRegion}
        onChange={setSelectedRegion}
        placeholder="지역 선택"
      />

      <div className="chipList">
        {foodCategories.map((food) => (
          <Chip
            key={food.id}
            id={food.id}
            label={food.label}
            isActive={selectedCat3 === food.cat3}
            onClick={() => setSelectedCat3(food.cat3)}
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
