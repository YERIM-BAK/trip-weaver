import { create } from "zustand";

type Course = {
  id: number;
  title: string;
  description: string;
  distance: string;
  time: string;
  petAllowed: boolean;
  image: string;
};

type State = {
  selectedId: number | null;
  bookmarks: number[];

  setSelected: (id: number) => void;
  toggleBookmark: (id: number) => void;
};

export const useCourseStore = create<State>((set) => ({
  selectedId: null,
  bookmarks: [],

  setSelected: (id) =>
    set((state) => ({
      selectedId: state.selectedId === id ? id : id,
    })),

  toggleBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.includes(id)
        ? state.bookmarks.filter((v) => v !== id)
        : [...state.bookmarks, id],
    })),
}));
