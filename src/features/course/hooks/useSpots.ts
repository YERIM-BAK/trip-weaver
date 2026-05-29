import { useState, useEffect, useTransition } from "react";
import { PetSpot } from "@/lib/petTour/petTour.types";
import { fetchPetSpotsByArea } from "@/lib/petTour/petTourApi";

interface UseSpotsParams {
  areaCode?: string;
  contentTypeId?: string;
  cat1?: string;
  cat2?: string;
  cat3?: string;
}

export function useSpots({
  areaCode = "",
  contentTypeId = "",
  cat1 = "",
  cat2 = "",
  cat3 = "",
}: UseSpotsParams = {}) {
  const [spots, setSpots] = useState<PetSpot[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const spots = await fetchPetSpotsByArea({
          areaCode,
          contentTypeId,
          cat1,
          cat2,
          cat3,
          numOfRows: 20,
        });
        setSpots(spots);
      } catch (e) {
        console.error(e);
      }
    });
  }, [areaCode, contentTypeId, cat1, cat2, cat3]);

  return { spots, isPending };
}
