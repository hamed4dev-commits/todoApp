"use client";

import { useState } from "react";
import TaskItem from "./TaskItem";
import { useTaskStore } from "@/stores/taskStores";
import Link from "next/link";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type FilterType = "all" | "completed" | "not-completed" | "favorites";

const TaskFilter = ({ data }: { data: Todo[] }) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const { favorites } = useTaskStore();

  const visibleData = (() => {
    switch (filter) {
      case "completed":
        return data.filter((item) => item.completed);
      case "not-completed":
        return data.filter((item) => !item.completed);
      case "favorites":
        return data.filter((item) => favorites.includes(item.id));
      default:
        return data;
    }
  })();

  return (
    <div>
      <div>Search comp</div>
      <button
        className="px-4 py-2 border-b-emerald-500 border rounded-2xl m-2 cursor-pointer"
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className="px-4 py-2 border-b-emerald-500 border rounded-2xl m-2 cursor-pointer"
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
      <button
        className="px-4 py-2 border-b-emerald-500 border rounded-2xl m-2 cursor-pointer"
        onClick={() => setFilter("not-completed")}
      >
        Not Completed
      </button>
      <button
        className="px-4 py-2 border-b-emerald-500 border rounded-2xl m-2 cursor-pointer"
        onClick={() => setFilter("favorites")}
      >
        Favorites
      </button>

      <div className="mt-4">
         <Link href={"/task/new"} className="border border-indigo-700 rounded-2xl text-indigo-300 px-3.5 py-2 ">
       New Task 
      </Link>
        {visibleData.map((item) => (
          <TaskItem item={item} key={item.id} />
        ))}
        {visibleData.length === 0 && <h3>No tasks found.</h3>}
      </div>
    </div>
  );
};

export default TaskFilter