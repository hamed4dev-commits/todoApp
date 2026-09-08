"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { DataTableFeatures } from "./data-table-features";
import { Todo } from "../../../types/taskFilter.type";
import { useTaskStore } from "../../../store/taskStores";
import FavoriteButton from "./FavoriteButton";
import { Star } from "lucide-react";

const columnHelper = createColumnHelper<DataTableFeatures, Todo>();

export const basicColumns = columnHelper.columns([
  columnHelper.accessor("id", { header: "ID" }),
  columnHelper.accessor("title", { header: "Task" }),
  columnHelper.accessor("completed", { header: "Status", cell: ({row}) => {
  
    const completed = row?.original.completed
    return completed ? (<span className="font-medium text-green-600">
      completed
    </span>) : (<span className="font-medium text-red-600">Pending</span>)
  } }),
  columnHelper.display({
    id:"favorite",
    header:"Favorite",
    cell: ({row}) => {
     return <FavoriteButton row={row} />
    },
    
  })
]);
