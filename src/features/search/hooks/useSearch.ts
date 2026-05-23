import { KakaoPlace } from "@/features/search/search.types";
import { useState, useCallback } from "react";

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<KakaoPlace[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = useCallback(async () => {
    const q = searchQuery.trim();
    if (!q) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(
        `/api/places?query=${encodeURIComponent(q)}&size=5`,
      );
      const data = await res.json();
      setSearchResults(data ?? []);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, []);

  const handleFocus = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => setIsSearchOpen(false), 150);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearching,
    handleSearch,
    clearSearch,
    isSearchOpen,
    handleFocus,
    handleBlur,
  };
}
