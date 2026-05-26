import { useState, useEffect } from "react";
import { PetSpot } from "./petTour.types";
import { fetchPopularPetSpots } from "./petTourApi";

interface UsePopularPetSpotsResult {
  spots: PetSpot[];
  loading: boolean;
  error: string | null;
}

export function usePopularPetSpots(areaCode: string): UsePopularPetSpotsResult {
  const [spots, setSpots] = useState<PetSpot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      setSpots([]);

      try {
        const { spots } = await fetchPopularPetSpots({ areaCode });
        setSpots(spots);
        if (spots.length === 0) setError("검색 결과가 없습니다.");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "알 수 없는 오류가 발생했습니다.",
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [areaCode]);

  return { spots, loading, error };
}
