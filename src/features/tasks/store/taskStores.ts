import { create } from "zustand";

interface FavState {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useTaskStore = create<FavState>((set, get) => ({
  favorites: [],
  addFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id) ? state.favorites : [...state.favorites, id],
    })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((favoriteId) => favoriteId !== id),
    })),
  isFavorite: (id) => get().favorites.includes(id),
}));
