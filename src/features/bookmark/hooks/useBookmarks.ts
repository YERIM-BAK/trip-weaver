import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  InfiniteData,
  QueryClient,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { PetSpot } from "@/lib/petTour/petTour.types";

const PAGE_SIZE = 10;

// 상세 페이지용(단건 조회)
export function useIsBookmarked(contentId: string) {
  return useQuery({
    queryKey: ["bookmark", contentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("post_id")
        .eq("post_id", contentId)
        .maybeSingle();
      if (error) throw error;
      return !!data;
    },
    enabled: !!contentId,
  });
}

export function useToggleBookmark() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, next }: { id: string; next: boolean }) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("세션이 만료됐어요. 다시 로그인해 주세요.");
      }

      if (next) {
        const { error } = await supabase
          .from("bookmarks")
          .insert({ post_id: id });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("post_id", id);
        if (error) throw error;
      }
    },

    onMutate: async ({ id, next }) => {
      await qc.cancelQueries({ queryKey: ["bookmark", id] });
      await qc.cancelQueries({ queryKey: ["bookmarks"] });

      const prevSingle = qc.getQueryData<boolean>(["bookmark", id]);
      const prevList = qc.getQueryData<InfiniteData<BookmarkPage>>([
        "bookmarks",
      ]);

      qc.setQueryData(["bookmark", id], next);
      if (!next) removeSpotFromList(qc, id);

      return { prevSingle, prevList, id };
    },
    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      qc.setQueryData(["bookmark", ctx.id], ctx.prevSingle);
      qc.setQueryData(["bookmarks"], ctx.prevList);
    },

    onSettled: (_data, _err, { id }) => {
      qc.invalidateQueries({ queryKey: ["bookmark", id] });
      qc.invalidateQueries({ queryKey: ["bookmarks"] });
      qc.invalidateQueries({ queryKey: ["bookmarks", "count"] });
    },
  });
}

interface BookmarkPage {
  spots: PetSpot[];
  nextOffset: number | null;
}

export function useBookmarkedSpots() {
  return useInfiniteQuery<BookmarkPage>({
    queryKey: ["bookmarks"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const from = pageParam as number;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from("bookmarks")
        .select("post_id")
        .order("created_at", { ascending: false })
        .range(from, to);
      if (error) throw error;

      const ids = (data ?? []).map((r) => r.post_id as string);
      if (ids.length === 0) {
        return { spots: [], nextOffset: null };
      }

      const res = await fetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      const json = await res.json();

      return {
        spots: (json.spots ?? []) as PetSpot[],
        // 이번 페이지가 가득 찼으면 다음 페이지가 있을 수 있음
        nextOffset: ids.length === PAGE_SIZE ? from + PAGE_SIZE : null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });
}

function removeSpotFromList(qc: QueryClient, id: string) {
  qc.setQueryData<InfiniteData<BookmarkPage>>(["bookmarks"], (old) => {
    if (!old) return old;
    return {
      ...old,
      pages: old.pages.map((page) => ({
        ...page,
        spots: page.spots.filter((s) => s.contentid !== id),
      })),
    };
  });
}

export function useBookmarkCount() {
  return useQuery({
    queryKey: ["bookmarks", "count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("bookmarks")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });
}
