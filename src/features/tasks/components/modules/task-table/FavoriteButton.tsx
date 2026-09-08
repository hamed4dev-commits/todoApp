"use client";

import { Star } from "lucide-react";
import { useTaskStore } from "../../../store/taskStores";

function FavoriteButton({row}:any) {
    
  const { favorites, addFavorite, removeFavorite } = useTaskStore();

  const id = row?.original.id;
  const isFavorite = favorites.includes(id);
  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };
  return (
    <button
      onClick={handleFavorite}
      className="cursor-pointer"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        className={
          isFavorite
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground"
        }
      />
    </button>
  );
};

export default FavoriteButton;
