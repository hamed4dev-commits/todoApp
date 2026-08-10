"use client"
import { useTaskStore } from "@/stores/taskStores";


type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
const TaskItem = ({ item }: { item: Todo }) => {
    const {favorites,addFavorite,removeFavorite,isFavorite}= useTaskStore()
    // console.log(favorites)
  return (
    <div>
      TSKItem{item?.id}: {item.title}{" "} 
      <span className={item.completed ? "text-green-500" : "text-amber-400"}>
        {item.completed ? "Completed" : "pending"}
      </span>
      <button className={`px-4 py-2 border-b-emerald-500 border-1 rounded-2xl m-2 cursor-pointer ${isFavorite(item.id) ? "text-red-500" : "text-gray-500"}`} onClick={()=>isFavorite(item.id)?removeFavorite(item.id):addFavorite(item.id)}>
        ❤
      </button>
    </div>
  );
};

export default TaskItem;
