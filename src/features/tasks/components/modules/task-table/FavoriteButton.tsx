"use client";

import { Loader2, Star } from "lucide-react";
import { useTaskStore } from "../../../store/taskStores";
import { useEffect, useState } from "react";

function FavoriteButton({row}:any) {
  //  const[hydrated,setHydrated] = useState(false)
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
  // useEffect(()=>{
  //   setHydrated(true)
  // },[])
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
