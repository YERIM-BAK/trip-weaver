import { Pet } from "@/features/pet/pet.types";
import { create } from "zustand";

export interface PetStore {
  pets: Pet[];
  representative: Pet | null;
  setPets: (pets: Pet[]) => void;
  addPet: (pet: Pet) => void;
  updatePet: (id: string, pet: Partial<Pet>) => void;
  delete: (id: string) => void;
  setRepresentative: (id: string) => void;
}

export const usePetStore = create<PetStore>((set) => ({
  pets: [],
  representative: null,

  setPets: (pets) => {
    const representative =
      pets.find((pet) => pet.isRepresentative) ?? pets[0] ?? null;
    set({ pets, representative });
  },

  addPet: (pet) =>
    set((state) => ({
      pets: [...state.pets, pet],
      representative: state.pets.length === 0 ? pet : state.representative,
    })),

  updatePet: (id, updated) =>
    set((state) => ({
      pets: state.pets.map((pet) =>
        pet.id === id ? { ...pet, ...updated } : pet,
      ),
    })),

  delete: (id) =>
    set((state) => {
      const pets = state.pets.filter((pet) => pet.id !== id);
      return {
        pets,
        representative:
          pets.find((pet) => pet.isRepresentative) ?? pets[0] ?? null,
      };
    }),

  setRepresentative: (id) =>
    set((state) => ({
      pets: state.pets.map((pet) => ({
        ...pet,
        isRepresentative: pet.id === id,
      })),
      representative: state.pets.find((pet) => pet.id === id) ?? null,
    })),
}));
