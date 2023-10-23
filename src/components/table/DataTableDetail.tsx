'use client';

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import {
   ColumnDef,
   ExpandedState,
   flexRender,
   getCoreRowModel,
   getExpandedRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   useReactTable,
} from '@tanstack/react-table';
import React from 'react';

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   action?: any;
   children?: Function;
   topTable?: any;
   type?: any;
   className?: string;
}

export function DataTableDetail<TData, TValue>({
   columns,
   data,
   action,
   children = Function,
   className,
}: DataTableProps<TData, TValue>) {
   const [globalFilter, setGlobalFilter] = React.useState('');
   const [expanded, setExpanded] = React.useState<ExpandedState>({});
   const column = React.useMemo(
      () => columns,
      // eslint-disable-next-line
      []
   );
   const { getHeaderGroups, getRowModel } = useReactTable({
      data,
      columns: column,
      state: {
         globalFilter,
         expanded,
      },
      onExpandedChange: setExpanded,
      getCoreRowModel: getCoreRowModel(),
      getSubRows: (row: any) => row.subRows,
      getFilteredRowModel: getFilteredRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      onGlobalFilterChange: setGlobalFilter,
      getPaginationRowModel: getPaginationRowModel(),
   });
   return (
      <div className={className}>
         <div className="flex h-max items-center"></div>
         <Table className="dark:bg-container">
            <TableHeader>
               {getHeaderGroups().map((headerGroup) => (
                  <TableRow
                     key={headerGroup.id}
                     className="hover:bg-transparent"
                  >
                     {headerGroup.headers.map((header) => {
                        return (
                           <TableHead
                              className="text-[15px] font-medium bg-gray-100 dark:text-white text-[#474747]"
                              key={header.id}
                           >
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                   )}
                           </TableHead>
                        );
                     })}
                     {action && <TableHead>Action</TableHead>}
                  </TableRow>
               ))}
            </TableHeader>
            <TableBody>
               {getRowModel().rows?.length ? (
                  getRowModel().rows.map((row) => (
                     <React.Fragment key={row.id}>
                        <TableRow className="hover:dark:bg-[#25295a]">
                           {row.getVisibleCells().map((cell: any) => (
                              <TableCell key={cell.id}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                 )}
                              </TableCell>
                           ))}
                           {action && <TableCell>{children(row)}</TableCell>}
                        </TableRow>
                        {row.getIsExpanded() == true && (
                           <TableRow>
                              <TableCell
                                 className="dark:bg-container bg-white"
                                 colSpan={12}
                              >
                                 {children(row)}
                              </TableCell>
                           </TableRow>
                        )}
                     </React.Fragment>
                  ))
               ) : (
                  <TableRow>
                     <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                     >
                        No results.
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </div>
   );
}
