import { KakaoPlace } from "@/features/search/search.types";
import {
  useState,
  useCallback,
  useEffect,
  useRef,
  startTransition,
} from "react";

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<KakaoPlace[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // const fetchSearch = useCallback(async (q: string) => {
  //   if (!q.trim()) {
  //     setSearchResults([]);
  //     return;
  //   }

  //   setIsSearching(true);
  //   try {
  //     const res = await fetch(
  //       `/api/places?query=${encodeURIComponent(q.trim())}&size=5`,
  //     );
  //     const data = await res.json();
  //     setSearchResults(data ?? []);
  //   } finally {
  //     setIsSearching(false);
  //   }
  // }, []);

  const fetchSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setIsSearching(true);
    try {
      const res = await fetch(
        `/api/places?query=${encodeURIComponent(q.trim())}&size=5`,
        { signal: abortRef.current.signal },
      );
      const data = await res.json();
      setSearchResults(data ?? []);
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (!searchQuery.trim()) {
      return;
    }

    debounceTimer.current = setTimeout(() => {
      fetchSearch(searchQuery);
    }, 150);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchQuery, fetchSearch]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      startTransition(() => {
        setSearchResults([]);
      });
    }
  }, [searchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, []);

  const handleFocus = useCallback(() => setIsSearchOpen(true), []);
  const handleBlur = useCallback(() => {
    setTimeout(() => setIsSearchOpen(false), 150);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearching,
    handleSearch: fetchSearch,
    clearSearch,
    isSearchOpen,
    handleFocus,
    handleBlur,
  };
}
