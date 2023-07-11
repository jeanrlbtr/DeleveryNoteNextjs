'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import React from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  action?: any;
  children?: Function;
  topTable?: any;
  type?: any;
}

export function DataTable<TData, TValue>({ columns, type, data, action, children = Function, topTable }: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState('');

  const { getHeaderGroups, getRowModel, previousPage, getCanNextPage, getCanPreviousPage, nextPage } = useReactTable({
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
    <div className=''>
      <div className='flex h-max mb-[30px] items-center'>
        {!type && (
          <div className='w-[200px] rounded-[5px] border-[1px] bg-[#fff] px-1 border-[teal] flex justify-between items-center py-1 '>
            <input
              type='text'
              placeholder='Search'
              onChange={(e) => setGlobalFilter(e.target.value)}
              className='font-sans outline-none bg-[transparent] w-[150px]'
            />
            <div>
              <Icon
                icon={'icons8:search'}
                color='#525252'
                className='w-[22px] h-[22px]'
              />
            </div>
          </div>
        )}
        {topTable}
      </div>
      <Table className='bg-white rounded-[10px]'>
        <TableHeader>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
                {action && <TableCell>{children(row)}</TableCell>}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className='h-24 text-center'
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!type && (
        <div className='flex items-center justify-end space-x-2 py-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
