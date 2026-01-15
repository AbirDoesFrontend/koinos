import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";
import { cn } from "@/lib/utils";

const DataTable = <T,>({
  tableClassName,
  headerClassName,
  headerRowClassName,
  columns,
  data,
  rowKey,
  bodyRowClassName,
  headerCellClassName,
  bodyCellClassName,
}: DataTableProps<T>) => {
  return (
    <Table className={cn("custom-scrollbar", tableClassName)}>
      <TableHeader className={headerClassName}>
        <TableRow className={cn("hover:bg-transparent!", headerRowClassName)}>
          {columns.map((column, i) => (
            <TableHead
              className={cn(
                "bg-dark-400 text-purple-100 py-4 first:pl-5 last:pr-5",
                headerCellClassName,
                column.headClassName,
              )}
              key={i}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowKey(row, rowIndex)}
            className={cn(
              "overflow-hidden rounded-lg border-b border-purple-100/5 hover:bg-dark-400/30! relative",
              bodyRowClassName,
            )}
          >
            {columns.map((column, columnIndex) => (
              <TableCell
                className={cn(
                  "py-4 first:pl-5 last:pr-5",
                  bodyCellClassName,
                  column.cellClassName,
                )}
                key={columnIndex}
              >
                {column.cell(row, rowIndex)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default DataTable;
