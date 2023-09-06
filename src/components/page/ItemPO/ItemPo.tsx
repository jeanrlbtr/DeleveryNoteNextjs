'use client';
import { Timeline } from '@/components/item';
import { DataTable } from '@/components/table/DataTabel';
import { ItemPOColumns } from '@/components/table/columns';
import {
   DialogContent,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { CanRule } from '@/hooks/Can';
import { UseQueryFetching } from '@/hooks/UseQueryFetch';
import { AllItemType, ItemPO } from '@/types';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { Clock3, Search } from 'lucide-react';
import { useState } from 'react';
import { randomData } from './dataDummy';

// const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });
const status = ['ALL', 'PROCESS', 'CANCELED', 'FINISH', ' UNPROCESSED'];

const ItemPurchaseOrder = () => {
   const status1 = [
      {
         name: 'view All',
         key: 'ALL',
      },
      {
         name: 'Unprocessed',
         key: 'UNPROCESSED',
      },
      {
         name: 'Confirm',
         key: 'CONFIRM',
      },
      {
         name: 'Process',
         key: 'PROCESS',
      },
      {
         name: 'Canceled',
         key: 'CANCELED',
      },

      {
         name: 'Finish',
         key: 'FINISH',
      },
   ];
   const Can = CanRule();
   const [page, setPage] = useState<number>(1);
   const [statusQuery, setStatusQuery] = useState<string>('ALL');
   const [purchaseOrder, setPurchaseOrder] = useState<string>('all');

   const url =
      statusQuery !== 'ALL'
         ? `/delivery/v1/note/items?k=status&v=${statusQuery}&page=${page}`
         : `/delivery/v1/note/items?page=${page}`;

   const { isError } = UseQueryFetching<AllItemType>(url, [
      'getAllItems',
      page,
      statusQuery,
   ]);

   if (isError) {
      return <div>Erorr 404</div>;
   }

   // const noPo = data?.data.items.find((item: any) => item.no === purchaseOrder);
   const columnsPurchaseOrder: ColumnDef<ItemPO>[] = [
      {
         header: 'Name',
         accessorKey: 'name',
      },
      {
         header: 'Status',
         accessorKey: 'status',
         cell: (row) => {
            return (
               <div
                  className={`${
                     row.getValue() !== 'FINISH'
                        ? 'text-[#b88c3b]'
                        : 'text-[green]'
                  }`}
               >
                  <Select defaultValue={String(row.getValue())}>
                     <SelectTrigger
                        disabled={String(row.getValue()) === 'FINISH'}
                        className={`w-[180px] border-[1px] text-xs px-1 h-max py-2  z-0${
                           row.getValue() !== 'FINISH'
                              ? 'border-[#b88c3b]'
                              : 'border-[green]'
                        }`}
                     >
                        <SelectValue placeholder="Theme" />
                     </SelectTrigger>
                     <SelectContent>
                        {status.map((item, index) => (
                           <SelectItem
                              className="text-xs"
                              value={item}
                              key={index}
                           >
                              {item}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  {/* {String(row.getValue())} */}
               </div>
            );
         },
      },
      ...ItemPOColumns,
   ];

   return (
      <>
         <div className="h-full hidden mb-4 rounded-[5px] lg:flex gap-[10px] text-[14px]  bg-gray-50 overflow-hidden w-max">
            {status1.map((statusItem: any, index: number) => {
               return (
                  <button
                     key={index}
                     onClick={() => {
                        setPurchaseOrder('all');
                        setStatusQuery(statusItem.key);
                     }}
                     className={`px-[8px] lg:text-[16px] ${
                        statusQuery == statusItem.key
                           ? 'bg-gray-200 rounded-[5px] text-[#525252]'
                           : 'text-[#807f7f]'
                     } py-[8px]`}
                  >
                     {statusItem.name}
                  </button>
               );
            })}
         </div>
         <div className="lg:w-full lg:bg-white px-[12px] lg:gap-[12px] lg:pt-[20px] lg:rounded-[10px]">
            <div className="flex border-[1px] w-[200px] mb-6 py-1 px-2 rounded-[5px] gap-4 items-center">
               <Search className="w-4 h-4 text-gray-600" />
               <input
                  type="text"
                  placeholder="Search Item"
                  className=" w-[150px] outline-none overflow-hidden"
               />
            </div>
            <div className="w-full">
               <DataTable
                  data={randomData}
                  type={'item'}
                  columns={columnsPurchaseOrder}
                  action={true}
               >
                  {(row: any) => {
                     return (
                        <div className="flex gap-4 w-full items-center">
                           <Dialog>
                              <DialogTrigger>
                                 <div className="flex items-center gap-2 border-[1px] rounded-[7px] bg-[#405189]  px-2 py-1">
                                    <Clock3 className="w-[18px] h-[18px] cursor-pointer text-white" />
                                    <p className="text-white">Progress</p>
                                 </div>
                              </DialogTrigger>
                              <DialogContent className="rounded-[10px]">
                                 <DialogHeader>
                                    <DialogTitle>
                                       <p className="text-[20px] text-[#525252] font-[500]">
                                          Timeline Items
                                       </p>
                                    </DialogTitle>
                                 </DialogHeader>
                                 <Timeline
                                    dataItems={row.original.itemProgress}
                                 />
                              </DialogContent>
                           </Dialog>

                           {/* <div className="">
                              <Dialog>
                                 <DialogTrigger
                                    disabled={row.original.status === 'FINISH'}
                                 >
                                    <FolderSync
                                       className={`w-[25px] h-[25px]  ${
                                          row.original.status === 'FINISH'
                                             ? 'text-[#a8a8a8] cursor-not-allowed'
                                             : 'text-[#405189] cursor-pointer'
                                       }`}
                                    />
                                 </DialogTrigger>
                                 <DialogContent className="rounded-[10px]">
                                    <UpdateItems id={row.original.id} />
                                 </DialogContent>
                              </Dialog>
                           </div> */}
                        </div>
                     );
                  }}
               </DataTable>
            </div>
         </div>
      </>
   );
};

export default ItemPurchaseOrder;
