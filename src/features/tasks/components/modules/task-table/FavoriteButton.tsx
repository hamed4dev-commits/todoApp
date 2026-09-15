"use client";

import { Loader2, Star } from "lucide-react";
import { useTaskStore } from "../../../store/taskStores";


function FavoriteButton({row}:any) {
 
  const { favorites,hasHydrated, addFavorite, removeFavorite } = useTaskStore();

  const id = row?.original.id;
  const isFavorite = favorites.includes(id);
  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };
  
  if(!hasHydrated) {
    return (
      <Loader2 className="h-4 w-4 animate-spin"/>
    )
  }
 

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
