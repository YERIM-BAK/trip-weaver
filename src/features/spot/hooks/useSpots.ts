import { fetchPetSpotsByArea } from "@/lib/petTour/petTourApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

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
  const {
    data: spots = [],
    isPending,
    isError,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["spots", areaCode, contentTypeId, cat1, cat2, cat3],
    queryFn: () =>
      fetchPetSpotsByArea({
        areaCode,
        contentTypeId,
        cat1,
        cat2,
        cat3,
        numOfRows: 20,
      }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
  });

  return { spots, isPending, isError, isPlaceholderData };
}
