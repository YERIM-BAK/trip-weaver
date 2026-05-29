import { useState, useEffect, useTransition } from "react";
import { PetSpot } from "@/lib/petTour/petTour.types";
import { fetchPetSpotsByArea } from "@/lib/petTour/petTourApi";

export function useSpots(areaCode: string, contentTypeId: string) {
  const [spots, setSpots] = useState<PetSpot[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await fetchPetSpotsByArea({
          areaCode,
          contentTypeId,
        });
        setSpots(data);
      } catch (e) {
        console.error(e);
      }
    });
  }, [areaCode, contentTypeId]);

  return { spots, isPending };
}
