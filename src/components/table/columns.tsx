'use client';

import {
   Allhistory,
   Delevery,
   History,
   HistoryItem,
   Invoice,
   Items,
   Loading,
   RankItem,
   Users,
} from '@/lib/types';
import {
   DetailPoTableType,
   DriverDetailT,
   Item,
   LevelTabelType,
   ShipmentT,
   TollMetaT,
} from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
const ItemPOColumns: ColumnDef<Item>[] = [
   {
      header: 'Name',
      accessorKey: 'name',
      cell: (row) => {
         return (
            <div>
               <p>{String(row.getValue())}</p>
               <p className="text-[12px] text-gray-400">
                  {String(row.row.original.no)}
               </p>
            </div>
         );
      },
   },
   {
      header: 'Color',
      accessorKey: 'variant',
   },
   {
      header: 'Quantity',
      accessorKey: 'qty',
   },
   {
      header: 'Customer',
      cell: (row) => {
         const value = String(row.row.original.inv.store);
         return <div>{value}</div>;
      },
   },
   {
      header: 'Ricipient Name',
      cell: (row) => {
         const value = String(row.row.original.inv.recipientName);
         return <div>{value}</div>;
      },
   },
   {
      header: 'Date Shipment',
      cell: (row) => {
         const value = String(row.row.original.inv.dateDelivery);
         const date = new Date(value).toLocaleDateString();
         return <div>{date}</div>;
      },
   },
   {
      header: 'Date Order',
      cell: (row) => {
         const value = String(row.row.original.inv.dateNote);
         const date = new Date(value).toLocaleDateString();
         return <div>{date}</div>;
      },
   },
   {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
         const statusName = row.row.original.status?.name;
         return (
            <div
               className={`border-[1px] px-2 py-1 rounded-[5px]  w-max flex gap-2 items-center ${
                  statusName !== 'finish' ? 'text-[#dfab4c]' : 'text-[green]'
               }`}
            >
               <p className="font-medium">
                  {statusName || (
                     <span className="text-red-500">Unprocessed</span>
                  )}
               </p>
            </div>
         );
      },
   },
];
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

const LevelColumn: ColumnDef<LevelTabelType>[] = [
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
      cell: () => {
         return <div>loading please Wait</div>;
      },
   },
];

const detailNoteColumn: ColumnDef<DetailPoTableType>[] = [
   {
      header: '^',
      accessorKey: 'id',
      cell: ({ row }) => {
         return (
            <div>
               <Button
                  className="w-max h-max bg p-0 bg-[#eee] text-[#525252] hover:bg-[#cccccc]"
                  {...{
                     onClick: () => row.toggleExpanded(),
                     style: { cursor: 'pointer' },
                  }}
               >
                  {row.getIsExpanded() ? (
                     <ChevronDown className="w-[20px] h-[20px]" />
                  ) : (
                     <ChevronRight className="w-[20px] h-[20px]" />
                  )}
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
            <a href={link} target="_blank">
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
         return <p className="max-w-[200px]">{row.getValue('note')}</p>;
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
         const date = new Date(
            `${row.getValue('dateDelivery')}`
         ).toDateString();
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
            <a href={link} target="_blank">
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
         return (
            <p className="max-w-[200px]">{row.getValue('senderAddress')}</p>
         );
      },
   },
   {
      header: 'Reciepient Address',
      accessorKey: 'recipientName',
      cell: ({ row }) => {
         return (
            <p className="max-w-[200px]">{row.getValue('senderAddress')}</p>
         );
      },
   },
   {
      header: 'Reason Changed',
      accessorKey: 'reasonChanged',
      cell: ({ row }) => {
         return (
            <p className="max-w-[200px]">{row.getValue('reasonChanged')}</p>
         );
      },
   },
   {
      header: 'Note',
      accessorKey: 'note',
      cell: ({ row }) => {
         return <p className="max-w-[200px]">{row.getValue('note')}</p>;
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
                  className="w-max h-max bg p-0"
                  {...{
                     onClick: () => row.toggleExpanded(),
                     style: { cursor: 'pointer' },
                  }}
               >
                  {row.getIsExpanded() ? (
                     <ChevronDown className="w-[20px] h-[20px]" />
                  ) : (
                     <ChevronRight className="w-[20px] h-[20px]" />
                  )}
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
         const date = new Date(
            `${row.getValue('dateDelivery')}`
         ).toDateString();
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
            <a href={link} target="_blank">
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
               className="bg-[transparent] outline-none"
               defaultValue={row.getValue('reasonChanged')}
            />
         );
      },
   },
];

const userColumn: ColumnDef<Users>[] = [
   {
      header: 'Name',
      accessorKey: 'name',
   },
   {
      header: 'Is Active',
      accessorKey: 'isActive',
      cell: ({ row }) => {
         return (
            <div>
               {row.getValue('isActive') ? (
                  <p className="  w-max px-1">Active</p>
               ) : (
                  <p className=" w-max px-1">Non Active</p>
               )}
            </div>
         );
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
];

const columnsDelevery: ColumnDef<Delevery>[] = [
   {
      header: 'Nomor SJ',
      accessorKey: 'no',
   },

   {
      header: 'Sales',
      accessorKey: 'sales',
   },
   {
      header: 'Recipient Address',
      accessorKey: 'recipientAddress',
      cell: ({ row }) => {
         return <p className="w-[200px]">{row.getValue('recipientAddress')}</p>;
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
         const date = new Date(
            `${row.getValue('dateDelivery')}`
         ).toDateString();
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
               {row.getValue('status') === 'PROCESS' ? (
                  <p className="border-[orange]  lowercase font-[600] text-[#ca8b37] rounded-[4px] border-[1px] w-max px-3">
                     {row.getValue('status')}
                  </p>
               ) : row.getValue('status') === 'FINISH' ? (
                  <p className="border-[green]  lowercase text-[green] font-[600] rounded-[4px] border-[1px] w-max px-3">
                     {row.getValue('status')}
                  </p>
               ) : (
                  <p
                     className={`${
                        row.getValue('status')
                           ? 'border-[red]'
                           : 'border-[orange]'
                     }   lowercase text-[red] font-[600] rounded-[4px] border-[1px] w-max px-3`}
                  >
                     {row.getValue('status') || (
                        <span className="text-[#ca8b37]">Unprocessed</span>
                     )}
                  </p>
               )}
            </div>
         );
      },
   },
];

const rankColumn: ColumnDef<RankItem>[] = [
   {
      header: 'Name',
      accessorKey: 'name',
   },
   {
      header: 'Variant',
      accessorKey: 'variant',
   },
   {
      header: 'Total',
      accessorKey: 'total',
   },
];

const tollPaymentColumn: ColumnDef<TollMetaT>[] = [
   {
      header: 'Gate',
      accessorKey: 'gate',
   },
   {
      header: 'Amount',
      accessorKey: 'amount',
      cell: (row) => {
         return <p>Rp {row.row.original.amount.toLocaleString('id-ID')},00</p>;
      },
   },
   {
      header: 'Time',
      accessorKey: 'time',
   },
];

const shipmentColumn: ColumnDef<ShipmentT>[] = [
   {
      header: 'Driver Name',
      accessorKey: 'driverName',
   },
   {
      header: 'Driver Plate',
      accessorKey: 'driverPlate',
   },
   {
      header: 'Toll Balance',
      accessorKey: 'tollBalance',
      cell: (row) => {
         return (
            <p>Rp {row.row.original.tollBalance.toLocaleString('id-ID')},00</p>
         );
      },
   },
   {
      header: 'Amount Request',
      accessorKey: 'amountRequest',
      cell: (row) => {
         return (
            <p>
               Rp {row.row.original.amountRequest.toLocaleString('id-ID')},00
            </p>
         );
      },
   },

   {
      header: 'Shipment Date',
      accessorKey: 'shipmentDate',
      cell: (row) => {
         const date = new Date(String(row.getValue())).toDateString();
         return <p>{String(date)}</p>;
      },
   },
];

const driverColumn: ColumnDef<DriverDetailT>[] = [
   {
      header: 'Name',
      accessorKey: 'User',
      cell: (row) => {
         return <p>{row.row.original.User.name}</p>;
      },
   },
   {
      header: 'Plat No',
      accessorKey: 'platNo',
   },
];

export {
   InvoiceColumn,
   ItemPOColumns,
   LevelColumn,
   LoadingColumn,
   allHistoryColumn,
   columnsDelevery,
   detailNoteColumn,
   driverColumn,
   historyColumn,
   itemColumn,
   itemHistoryColumn,
   rankColumn,
   shipmentColumn,
   tollPaymentColumn,
   userColumn,
};
