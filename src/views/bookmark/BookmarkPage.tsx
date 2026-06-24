"use client";

import FeedbackMessage from "@/components/ui/FeedbackMessage/FeedbackMessage";
import { useBookmarkedSpots } from "@/features/bookmark/hooks/useBookmarks";
import SpotCard from "@/features/spot/components/SpotCard/SpotCard";
import { mapPetSpot } from "@/lib/petTour/petTour.utils";

function BookmarkPage() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBookmarkedSpots();

  if (isLoading) return <p style={{ padding: 24 }}>불러오는 중…</p>;
  if (isError)
    return <p style={{ padding: 24 }}>북마크를 불러오지 못했어요.</p>;

  const spots = data?.pages.flatMap((page) => page.spots) ?? [];

  if (spots.length === 0) {
    return (
      <FeedbackMessage status="error" title="아직 북마크한 장소가 없어요." />
    );
  }

  return (
    <div>
      <ul className="spotCardList">
        {spots.map((item) => (
          <li key={item.contentid}>
            <SpotCard spot={mapPetSpot(item)} />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button
          type="button"
          onClick={() => void fetchNextPage()}
          disabled={isFetchingNextPage}
          style={{ marginTop: 16, padding: "8px 16px", borderRadius: 8 }}
        >
          {isFetchingNextPage ? "불러오는 중…" : "더 보기"}
        </button>
      )}
    </div>
  );
}

export default BookmarkPage;
