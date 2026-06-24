"use client";

import Button from "@/components/ui/Button/Button";
import FeedbackMessage from "@/components/ui/FeedbackMessage/FeedbackMessage";
import {
  useBookmarkCount,
  useBookmarkedSpots,
} from "@/features/bookmark/hooks/useBookmarks";
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
  const { data: totalCount = 0 } = useBookmarkCount();

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
      <div className="section-header">
        <p className="result-count">
          <span className="count">{totalCount}</span>개의 장소
        </p>
      </div>
      <ul className="spotCardList">
        {spots.map((item) => (
          <li key={item.contentid}>
            <SpotCard spot={mapPetSpot(item)} />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <div className="btn-group">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => void fetchNextPage()}
            disabled={isFetchingNextPage}
            style={{ marginTop: 16, padding: "8px 16px", borderRadius: 8 }}
          >
            {isFetchingNextPage ? "불러오는 중…" : "더보기"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default BookmarkPage;
