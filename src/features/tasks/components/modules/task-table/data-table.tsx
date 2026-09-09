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
import { getPageNumbers } from "../../helpers/helper";

interface DataTableProps<Todo extends RowData> {
  columns: ColumnDef<DataTableFeatures, Todo>[];
  data: Todo[];
}

export function DataTable<Todo extends RowData>({
  columns,
  data,
}: DataTableProps<Todo>) {
  const table = useTable(
    {
      features,
      data,
      columns,
    },
    (state) => ({
      pagination: state.pagination,
    }),
  );
  const currentPage = table.state.pagination.pageIndex + 1;
  const pageCount = table.getPageCount();
  const pages = getPageNumbers(currentPage, pageCount, 2);
  // console.log(currentPage, pageCount);

  return (
    <div className="overflow-hidden rounded-md border border-gray-500">
      <Table>
        <TableHeader>
          {/* {table?.getHeaderGroups.map((headerGroup)=> (console.log(headerGroup))} */}
          {table?.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="border-r border-r-gray-500 last:border-none"
                  >
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
                className="odd:bg-gray-800 border-b-gray-500"
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
          <span className="text-sm text-muted-foreground px-2">
              Page {currentPage} of {pageCount}
            </span>
          <div>
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
            
            {pages.map((page, i) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="px-2 text-muted-foreground"
                >
                  …
                </span>
              ) : (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => table.setPageIndex(page - 1)} // TanStack is 0-based
                >
                  {page}
                </Button>
              ),
            )}
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
          </div>
          
        </TooltipProvider>
      </div>
    </div>
  );
}
