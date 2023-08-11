'use client';

import { Button } from '@/components/ui/button';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { Icon } from '@iconify/react';
import {
   ColumnDef,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { SelectLimit } from '../item';

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   action?: any;
   children?: Function;
   topTable?: any;
   type?: any;
   isLoading?: boolean;
   nextPage?: Function;
   previousPage?: Function;
   disabledNext?: boolean;
   disabledPrev?: boolean;
   limit?: string;
   onChange?: Function;
}

export function DataTable<TData, TValue>({
   isLoading = false,
   columns,
   type,
   data,
   action,
   children = Function,
   topTable,
   nextPage = Function,
   previousPage = Function,
   disabledNext,
   disabledPrev,
   limit,
   onChange = Function,
}: DataTableProps<TData, TValue>) {
   const [globalFilter, setGlobalFilter] = React.useState('');
   const { getHeaderGroups, getRowModel } = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onGlobalFilterChange: setGlobalFilter,
      getPaginationRowModel: getPaginationRowModel(),
      state: {
         globalFilter,
      },
   });

   return (
      <div className="">
         {!type && (
            <div className="flex h-max mb-[30px] items-center">
               <div className="w-[200px] rounded-[5px] border-[1px] bg-[#fff] px-1 border-[teal] flex justify-between items-center py-1 ">
                  <input
                     type="text"
                     placeholder="Search"
                     onChange={(e) => setGlobalFilter(e.target.value)}
                     className="font-sans outline-none bg-[transparent] w-[150px]"
                  />
                  <div>
                     <Icon
                        icon={'icons8:search'}
                        color="#525252"
                        className="w-[22px] h-[22px]"
                     />
                  </div>
               </div>
               {topTable}
            </div>
         )}
         <div
            className={`tableContainer h-[60vh] rounded-sm overflow-auto relative`}
         >
            <Table className="bg-white w-full">
               <TableHeader>
                  {getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext()
                                      )}
                              </TableHead>
                           );
                        })}
                        {action && !isLoading ? (
                           <TableHead>Action</TableHead>
                        ) : (
                           ''
                        )}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {!isLoading ? (
                     getRowModel().rows?.length ? (
                        getRowModel().rows.map((row) => (
                           <TableRow key={row.id}>
                              {row.getVisibleCells().map((cell) => (
                                 <TableCell key={cell.id}>
                                    {flexRender(
                                       cell.column.columnDef.cell,
                                       cell.getContext()
                                    )}
                                 </TableCell>
                              ))}
                              {action && <TableCell>{children(row)}</TableCell>}
                           </TableRow>
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
                     )
                  ) : (
                     <TableRow>
                        <TableCell colSpan={columns.length} className="h-max">
                           <div className="flex relative justify-center h-[30vh] w-full">
                              <div className="transform translate-x-1/2 translate-y-1/4 ">
                                 <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-28 w-28"></div>
                              </div>
                           </div>
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>

         <div className="flex items-center justify-end space-x-2 py-4">
            {limit && <SelectLimit onValueChange={onChange} limit={limit} />}
            <Button
               variant="outline"
               size="sm"
               onClick={() => previousPage()}
               disabled={disabledPrev}
            >
               Previous
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => nextPage()}
               disabled={disabledNext}
            >
               Next
            </Button>
         </div>
      </div>
   );
}
