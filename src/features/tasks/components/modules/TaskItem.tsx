"use client";

import { useTaskStore } from "@/src/features/tasks/store/taskStores";
import Link from "next/link";
import { Todo } from "../../types/taskFilter.type";


const TaskItem = ({ item }: { item: Todo }) => {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useTaskStore();
  // console.log(favorites)
  return (
    <div>
        TSKItem{item?.id}:
      <Link href={`/task/${item?.id}`}>
         {item.title}
      </Link>
      <span className={item.completed ? "text-green-500" : "text-amber-400"}>
        {item.completed ? "Completed" : "pending"}
      </span>
      <button
        className={`px-4 py-2 border-b-emerald-500 border rounded-2xl m-2 cursor-pointer ${isFavorite(item.id) ? "text-red-500" : "text-gray-500"}`}
        onClick={() =>
          isFavorite(item.id) ? removeFavorite(item.id) : addFavorite(item.id)
        }
      >
        ❤
      </button>
    </div>
  );
};

export default TaskItem;
