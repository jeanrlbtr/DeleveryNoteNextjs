'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export type Delevery = {
  no: number;
  store: string;
  sales: string;
  address: string;
  nomor_sj: string;
  dateDelevery: string;
  status: boolean;
};

export type Users = {
  name: string;
  username: string;
  isActive: boolean;
  levelId: string;
  image: string;
  autoUpdate: boolean;
};
export type Invoice = {
  name: string;
  qty: number;
};

export type Level = {
  code: number;
  name: string;
};

export const InvoiceColumn: ColumnDef<Invoice>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Quantity',
    accessorKey: 'qty',
  },
];

export const LevelColumn: ColumnDef<Level>[] = [
  {
    header: 'Level',
    accessorKey: 'code',
  },
  {
    header: 'Level Name',
    accessorKey: 'name',
  },
];

export const userColumn: ColumnDef<Users>[] = [
  {
    header: 'Photo',
    accessorKey: 'image',
    cell: ({ row }) => {
      return (
        <div className='h-[45px] w-[45px] rounded-full bg-gray-500 text-center text-[white] relative overflow-hidden'>
          <Image
            src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3MzkxODYzOA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
            alt=''
            fill
            className='object-cover'
          />
        </div>
      );
    },
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Username',
    accessorKey: 'username',
  },
  {
    header: 'Is Active',
    accessorKey: 'isActive',
    cell: ({ row }) => {
      return <div>{row.getValue('isActive') ? <p className='  w-max px-1'>Active</p> : <p className=' w-max px-1'>Non Active</p>}</div>;
    },
  },
  {
    header: 'Level User',
    accessorKey: 'levelUser',
    cell: ({ row }) => {
      const userlevel: any = row.getValue('levelUser');
      return <div>{userlevel.name}</div>;
    },
  },
  {
    header: 'Auto Update',
    accessorKey: 'autoUpdate',
    cell: ({ row }) => {
      return <div>{row.getValue('autoUpdate') ? <p className='  w-max px-1'>Auto Update</p> : <p className=' w-max px-1'>Non Auto Update</p>}</div>;
    },
  },
];
export const columnsDelevery: ColumnDef<Delevery>[] = [
  {
    header: 'Nomor SJ',
    accessorKey: 'no',
  },

  {
    header: 'Name',
    accessorKey: 'sales',
  },
  {
    header: 'Address',
    accessorKey: 'recipientAddress',
    size: 150,
    cell: ({ row }) => {
      return (
        <div className='w-max '>
          <input
            value={row.getValue('recipientAddress')}
            readOnly
            className='w-[150px] outline-none'
          />
        </div>
      );
    },
  },
  {
    header: 'Store',
    accessorKey: 'store',
  },
  {
    header: 'Date Delevery',
    accessorKey: 'dateDelivery',
    cell: ({ row }) => {
      const date = new Date(`${row.getValue('dateDelivery')}`).toDateString();
      return <div>{date}</div>;
    },
  },
  {
    header: 'Date Note',
    accessorKey: 'dateNote',
    cell: ({ row }) => {
      const date = new Date(`${row.getValue('dateNote')}`).toDateString();
      return <div>{date}</div>;
    },
  },
  // {
  //   header: 'Status',
  //   accessorKey: 'status',
  //   cell: ({ row }) => {
  //     return (
  //       <div>
  //         {row.getValue('status') ? (
  //           <p className='border-[orange] rounded-[5px] border-[1px] w-max px-1'>Unprocess</p>
  //         ) : (
  //           <p className='border-[green] rounded-[5px] border-[1px] w-max px-1'>OnProcess</p>
  //         )}
  //       </div>
  //     );
  //   },
  // },
];
