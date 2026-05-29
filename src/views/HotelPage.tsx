"use client";

import Chip from "@/components/ui/Chip/Chip";
import Dropdown from "@/components/ui/Dropdown/Dropdown";
import Skeleton from "@/components/ui/Skeleton/Skeleton";
import { AREA_CODES } from "@/constants/tour";
import SpotCard from "@/features/course/components/SpotCard/SpotCard";
import { useSpots } from "@/features/course/hooks/useSpots";
import { mapPetSpot } from "@/lib/petTour/petTour.utils";
import { useState } from "react";

const hotelCategories = [
  { id: "all", label: "전체", cat2: "" },
  { id: "hotel", label: "호텔", cat2: "B0201" },
  { id: "condo", label: "콘도", cat2: "B0202" },
  { id: "pension", label: "펜션", cat2: "B0204" },
  { id: "guesthouse", label: "게스트하우스", cat2: "B0207" },
];

export default function HotelPage() {
  const [selectedRegion, setSelectedRegion] = useState("");
  // const [selectedCat2, setSelectedCat2] = useState("");

  const { spots, isPending } = useSpots({
    areaCode: selectedRegion,
    contentTypeId: "32",
    cat1: "B02",
  });

  const regionOptions = AREA_CODES.map((r) => ({
    label: r.name,
    value: r.code,
  }));

  return (
    <section className="section">
      <h2 className="sectionTitle">반려동물 동반 숙소</h2>

      <Dropdown
        options={regionOptions}
        value={selectedRegion}
        onChange={setSelectedRegion}
        placeholder="지역 선택"
      />

      {/* <div className="chipList">
        {hotelCategories.map((hotel) => (
          <Chip
            key={hotel.id}
            id={hotel.id}
            label={hotel.label}
            isActive={selectedCat2 === hotel.cat2}
            onClick={() => setSelectedCat2(hotel.cat2)}
          />
        ))}
      </div> */}

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
