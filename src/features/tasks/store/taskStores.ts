import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavState {
  favorites: number[];
  hasHydrated: boolean;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  setHasHydrated:(value:boolean) => void;
}

export const useTaskStore = create<FavState>()(
  persist(
    (set, get) => ({
      favorites: [],
     hasHydrated:false,
      addFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites
            : [...state.favorites, id],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((favoriteId) => favoriteId !== id),
        })),
      isFavorite: (id) => get().favorites.includes(id),
      setHasHydrated: (value) => set({hasHydrated : value})
    }),
    {
      name: "task-favorites",
      partialize: (state) => ({
        favorites: state.favorites,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      }, 
    },
  ),
);
