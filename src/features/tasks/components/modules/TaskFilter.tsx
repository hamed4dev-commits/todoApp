"use client";

import { useState } from "react";
import Link from "next/link";

import { useTaskStore } from "@/src/features/tasks/store/taskStores";
import TaskItem from "./TaskItem";
import { FilterType, Todo } from "../../types/taskFilter.type";
import { DataTable } from "./task-table/data-table";
import { basicColumns } from "./task-table/columns";

const TaskFilter = ({ data }: { data: Todo[] }) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const { favorites } = useTaskStore();
  // console.log(data)
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

      <div className="my-4">
        <Link
          href={"/task/new"}
          className="border border-indigo-700 rounded-2xl text-indigo-300 px-3.5 py-2 "
        >
          New Task
        </Link>
        {/* {visibleData &&
          visibleData.map((item) => <TaskItem item={item} key={item.id} />)}
        {visibleData.length === 0 && <h3>No tasks found.</h3>} */}
      </div>
        <DataTable columns={basicColumns} data={visibleData} />
    </div>
  );
};

export default TaskFilter;
