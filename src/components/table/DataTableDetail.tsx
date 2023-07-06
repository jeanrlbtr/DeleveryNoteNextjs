'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ExpandedState,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

export function DataTableDetail<TData, TValue>({ columns, type, data, action, children = Function, className }: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const column = React.useMemo(() => columns, []);
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
      <div className='flex h-max items-center'></div>
      <Table className=''>
        <TableHeader>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className='text-[17px] text-[black] '
                    key={header.id}
                  >
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
              <React.Fragment key={row.id}>
                <TableRow>
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                  {action && <TableCell>{children(row)}</TableCell>}
                </TableRow>
                {row.getIsExpanded() == true && (
                  <TableRow>
                    <TableCell
                      className='bg-white'
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
                className='h-24 text-center'
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
