"use client";

import Dropdown from "@/components/ui/Dropdown/Dropdown";
import Skeleton from "@/components/ui/Skeleton/Skeleton";
import { AREA_CODES, CONTENT_TYPE_MAP } from "@/constants/tour";
import SpotCard from "@/features/course/components/SpotCard/SpotCard";
import { useSpots } from "@/features/course/hooks/useSpots";
import { PetSpot } from "@/lib/petTour/petTour.types";
import { useState } from "react";

const mapToSpot = (spot: PetSpot) => ({
  id: spot.contentid,
  name: spot.title,
  address: spot.addr1,
  category: CONTENT_TYPE_MAP[spot.contenttypeid] ?? "",
  image: spot.firstimage ?? spot.firstimage2 ?? null,
});

export default function CafePage() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const { spots, isPending } = useSpots({
    areaCode: selectedRegion,
    contentTypeId: "39",
    cat1: "A05",
    cat2: "A0502",
    cat3: "A05020900",
  });

  const regionOptions = AREA_CODES.map((r) => ({
    label: r.name,
    value: r.code,
  }));

  return (
    <section className="section">
      <h2 className="sectionTitle">반려동물 동반 카페</h2>

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
              <SpotCard spot={mapToSpot(item)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
