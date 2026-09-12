"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { DataTableFeatures } from "./data-table-features";
import { Todo } from "../../../types/taskFilter.type";
import { useTaskStore } from "../../../store/taskStores";
import FavoriteButton from "./FavoriteButton";
import { CircleCheck, Loader, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const columnHelper = createColumnHelper<DataTableFeatures, Todo>();

export const basicColumns = columnHelper.columns([
  columnHelper.accessor("id", { header: "ID" }),
  columnHelper.accessor("title", { header: "Task" }),
  columnHelper.accessor("completed", {
    header: "Status",
    cell: ({ row }) => {
      const completed = row?.original.completed;
      return completed ? (
        <Badge variant={"default"} className="font-medium text-green-600 ">
          <CircleCheck className="fill-lime-600 text-gray-900" />
          completed
        </Badge>
      ) : (
        <Badge variant={"default"} className="font-medium text-rose-600">
          <Loader className="stroke-amber-400 " />
          Pending
        </Badge>
      );
    },
  }),
  columnHelper.display({
    id: "favorite",
    header: "Favorite",
    cell: ({ row }) => {
      return <FavoriteButton row={row} />;
    },
  }),
]);
