'use client';

import { Delevery, Invoice, Level, Loading, NoteDetail, Users, History, Items, HistoryItem, Allhistory } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronRight } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

const InvoiceColumn: ColumnDef<Invoice>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Quantity',
    accessorKey: 'qty',
  },
];

const LevelColumn: ColumnDef<Level>[] = [
  {
    header: 'Level',
    accessorKey: 'code',
  },
  {
    header: 'Level Name',
    accessorKey: 'name',
  },
];

const LoadingColumn: ColumnDef<Loading>[] = [
  {
    header: 'Loading',
    accessorKey: 'loading',
    cell: ({ row }) => {
      return <div>loading please Wait</div>;
    },
  },
];

const detailNoteColumn: ColumnDef<NoteDetail>[] = [
  {
    header: '^',
    accessorKey: 'id',
    cell: ({ row }) => {
      return (
        <div>
          <Button
            className='w-max h-max bg p-0 bg-[#eee] text-[#525252] hover:bg-[#cccccc]'
            {...{
              onClick: () => row.toggleExpanded(),
              style: { cursor: 'pointer' },
            }}
          >
            {row.getIsExpanded() ? <ChevronDown className='w-[20px] h-[20px]' /> : <ChevronRight className='w-[20px] h-[20px]' />}
          </Button>
        </div>
      );
    },
  },
  {
    header: 'Sales',
    accessorKey: 'sales',
  },
  {
    header: 'Store',
    accessorKey: 'store',
  },
  {
    header: 'Date PO',
    accessorKey: 'dateNote',
    cell: ({ row }) => {
      const date = new Date(`${row.getValue('dateNote')}`).toDateString();
      return <div>{date}</div>;
    },
  },
  {
    header: 'Attachment',
    accessorKey: 'attachment',
    cell: ({ row }) => {
      const link = `${row.getValue('attachment')}`;
      return (
        <a
          href={link}
          target='_blank'
        >
          attachment
        </a>
      );
    },
  },
  {
    header: 'Sender Name',
    accessorKey: 'senderName',
  },
  {
    header: 'Recieptent Name',
    accessorKey: 'recipientName',
  },
  {
    header: 'Note',
    accessorKey: 'note',
    cell: ({ row }) => {
      return <p className='max-w-[200px]'>{row.getValue('note')}</p>;
    },
  },
];

const historyColumn: ColumnDef<History>[] = [
  {
    header: 'Sales',
    accessorKey: 'sales',
  },
  {
    header: 'Store',
    accessorKey: 'store',
  },
  {
    header: 'Date PO',
    accessorKey: 'dateNote',
    cell: ({ row }) => {
      const date = new Date(`${row.getValue('dateNote')}`).toDateString();
      return <div>{date}</div>;
    },
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
    header: 'Date History',
    accessorKey: 'addDate',
    cell: ({ row }) => {
      const date = new Date(`${row.getValue('addDate')}`).toDateString();
      return <div>{date}</div>;
    },
  },
  {
    header: 'Attachment',
    accessorKey: 'attachment',
    cell: ({ row }) => {
      const link = `${row.getValue('attachment')}`;
      return (
        <a
          href={link}
          target='_blank'
        >
          attachment
        </a>
      );
    },
  },
  {
    header: 'Sender Name',
    accessorKey: 'senderName',
  },
  {
    header: 'Sender Address',
    accessorKey: 'senderAddress',
    cell: ({ row }) => {
      return <p className='max-w-[200px]'>{row.getValue('senderAddress')}</p>;
    },
  },
  {
    header: 'Reciepient Address',
    accessorKey: 'recipientName',
    cell: ({ row }) => {
      return <p className='max-w-[200px]'>{row.getValue('senderAddress')}</p>;
    },
  },
  {
    header: 'Reason Changed',
    accessorKey: 'reasonChanged',
    cell: ({ row }) => {
      return <p className='max-w-[200px]'>{row.getValue('reasonChanged')}</p>;
    },
  },
  {
    header: 'Note',
    accessorKey: 'note',
    cell: ({ row }) => {
      return <p className='max-w-[200px]'>{row.getValue('note')}</p>;
    },
  },
];

const itemColumn: ColumnDef<Items>[] = [
  {
    header: '^',
    accessorKey: 'id',
    cell: ({ row }) => {
      return (
        <div>
          <Button
            className='w-max h-max bg p-0'
            {...{
              onClick: () => row.toggleExpanded(),
              style: { cursor: 'pointer' },
            }}
          >
            {row.getIsExpanded() ? <ChevronDown className='w-[20px] h-[20px]' /> : <ChevronRight className='w-[20px] h-[20px]' />}
          </Button>
        </div>
      );
    },
  },
  {
    header: 'Reason',
    accessorKey: 'reasonChanged',
  },
  {
    header: 'Date',
    accessorKey: 'addDate',
    cell: ({ row }) => {
      const date = new Date(`${row.getValue('addDate')}`).toDateString();
      return <div>{date}</div>;
    },
  },
];

const itemHistoryColumn: ColumnDef<HistoryItem>[] = [
  {
    header: 'Item Id',
    accessorKey: 'itemId',
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'Variant',
    accessorKey: 'variant',
  },
  {
    header: 'Quantity',
    accessorKey: 'qty',
  },
];

const allHistoryColumn: ColumnDef<Allhistory>[] = [
  {
    header: 'Sales',
    accessorKey: 'sales',
  },
  {
    header: 'Store',
    accessorKey: 'store',
  },

  {
    header: 'Date Note',
    accessorKey: 'dateNote',
    cell: ({ row }) => {
      const date = new Date(`${row.getValue('dateNote')}`).toDateString();
      return <div>{date}</div>;
    },
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
    header: 'Add Date',
    accessorKey: 'addDate',
    cell: ({ row }) => {
      const date = new Date(`${row.getValue('addDate')}`).toDateString();
      return <div>{date}</div>;
    },
  },
  {
    header: 'Attachment',
    accessorKey: 'attachment',
    cell: ({ row }) => {
      const link = `${row.getValue('addDate')}`;
      return (
        <a
          href={link}
          target='_blank'
        >
          attachment
        </a>
      );
    },
  },
  {
    header: 'Reason Changed',
    accessorKey: 'reasonChanged',
    cell: ({ row }) => {
      return (
        <input
          className='bg-[transparent] outline-none'
          defaultValue={row.getValue('reasonChanged')}
        />
      );
    },
  },
];

const userColumn: ColumnDef<Users>[] = [
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

const columnsDelevery: ColumnDef<Delevery>[] = [
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
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue('status') !== 'FINISH' ? (
            <p className='border-[orange]  lowercase rounded-[5px] border-[1px] w-max px-1'>{row.getValue('status')}</p>
          ) : (
            <p className='border-[green] bg-[#0080002d] lowercase text-[green] font-[600] rounded-[8px] border-[1px] w-max px-3'>
              {row.getValue('status')}
            </p>
          )}
        </div>
      );
    },
  },
];

export {
  InvoiceColumn,
  columnsDelevery,
  userColumn,
  allHistoryColumn,
  LevelColumn,
  LoadingColumn,
  itemColumn,
  historyColumn,
  detailNoteColumn,
  itemHistoryColumn,
};
