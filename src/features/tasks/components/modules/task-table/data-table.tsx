"use client";

import { ColumnDef, RowData, useTable } from "@tanstack/react-table";
import { features, type DataTableFeatures } from "./data-table-features";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Todo } from "../../../types/taskFilter.type";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DataTableProps<Todo extends RowData> {
  columns: ColumnDef<DataTableFeatures, Todo>[];
  data: Todo[];
}

export function DataTable<Todo extends RowData>({
  columns,
  data,
}: DataTableProps<Todo>) {
  const table = useTable({
    features,
    data,
    columns,
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {/* {table?.getHeaderGroups.map((headerGroup)=> (console.log(headerGroup))} */}
          {table?.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No Results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Separator />
      <div className="text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant={"secondary"}
                  size={"sm"}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                />
              }
            >
              <ArrowBigLeft />
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>back</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant={"secondary"}
                  size={"sm"}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                />
              }
            >
              <ArrowBigRight />
              {/* </Button> */}
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>next</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
