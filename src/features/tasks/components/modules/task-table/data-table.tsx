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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
      <div className="text-center mt-2">
        <TooltipProvider >
          <span className="text-sm text-muted-foreground px-2">
            Page {currentPage} of {pageCount}
          </span>
          <div className="flex justify-center items-center mb-2">
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
            <div>
              {pages.map((page, i) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="px-2 text-muted-foreground text-xl leading-none "
                  >   
                    …
                  </span>
                ) : (
                  <Button
                    key={page}
                    variant={page === currentPage ? "secondary" : "outline"}
                    size="sm"
                    className="transition-all ease-in delay-200 duration-200"
                    onClick={() => table.setPageIndex(page - 1)} // TanStack is 0-based
                  >
                    {page}
                  </Button>
                ),
              )}
            </div>
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
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>next</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
      {/* <div>
        <Pagination>
          <PaginationContent >
            <PaginationItem className="transition-all ease-in-out delay-150 duration-300">
              <PaginationPrevious
                onClick={() => table.previousPage()}
                className={
                  !table.getCanPreviousPage()
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              ></PaginationPrevious>
            </PaginationItem>
            {pages.map((page, i) =>
              page === "..." ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => table.setPageIndex(page - 1)}
                    className="transition-all ease-in delay-150 duration-300"
                    // className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                className={
                  !table.getCanNextPage()
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div> */}
    </div>
  );
}
