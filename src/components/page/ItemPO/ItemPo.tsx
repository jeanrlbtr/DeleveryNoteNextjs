'use client';

import { Timeline } from '@/components/item';
import UpdateItems from '@/components/item/Form/UpdateStatusItems';
import { DataTable } from '@/components/table/DataTabel';
import { ItemPOColumns } from '@/components/table/columns';
import {
   DialogContent,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import { CanRule } from '@/hooks/Can';
import { UseQueryFetching } from '@/hooks/UseQueryFetch';
import { Item, ItemPO, StatusItem, StatusT } from '@/types';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { Row } from '@tanstack/react-table';
import { GanttChart, PlusCircle, Search } from 'lucide-react';
import { useState } from 'react';

const ItemPurchaseOrder = ({ data: statusPO }: StatusItem) => {
   const allStatusPO = [{ name: 'View All', id: 0 }, ...statusPO];
   const Can = CanRule();
   const [page, setPage] = useState<number>(1);
   const [statusQuery, setStatusQuery] = useState<string | number>(0);

   const url =
      statusQuery !== 0
         ? `/delivery/v1/note/items?statusId=${1}&limit=${10}&page=${page}`
         : `/delivery/v1/note/items?page=${page}&limit=${10}`;

   const { data, isError } = UseQueryFetching<ItemPO>(url, [
      'getAllItems',
      page,
      statusQuery,
   ]);

   if (isError) {
      return <div>Erorr 404</div>;
   }

   return (
      <>
         <div className="h-full hidden mb-4 rounded-[5px] lg:flex gap-[10px] text-[14px] bg-gray-50 overflow-hidden w-max">
            {allStatusPO.map((statusItem: StatusT, index: number) => {
               return (
                  <button
                     key={index}
                     onClick={() => {
                        setStatusQuery(statusItem.id);
                     }}
                     className={`px-[8px] lg:text-[16px] ${
                        statusQuery == statusItem.id
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
            <div className="flex ml-2 border-[1px] w-[200px] mb-6 py-1 px-2 rounded-[5px] gap-4 items-center">
               <Search className="w-4 h-4 text-gray-600" />
               <input
                  type="text"
                  placeholder="Search Item"
                  className=" w-[150px] outline-none overflow-hidden"
               />
            </div>
            <div className="w-full">
               <DataTable
                  data={data?.data.items || []}
                  type={'item'}
                  columns={ItemPOColumns}
                  action={true}
               >
                  {(row: Row<Item>) => {
                     const itemProgress = row.original.itemProgress;
                     return (
                        <div className="flex gap-4 w-full items-center">
                           <Dialog>
                              <DialogTrigger>
                                 <div
                                    className={`flex items-center gap-2 border-[1px] rounded-[7px] px-2 py-1`}
                                 >
                                    <GanttChart className="w-[18px] h-[18px] cursor-pointer text-[#405189]" />
                                 </div>
                              </DialogTrigger>
                              <DialogContent className="rounded-[10px]">
                                 <DialogHeader>
                                    <DialogTitle>
                                       <p className="text-[20px] text-[#525252] font-[500]">
                                          Timeline Items {row.original.name}
                                       </p>
                                    </DialogTitle>
                                 </DialogHeader>
                                 <Timeline dataItems={itemProgress} />
                              </DialogContent>
                           </Dialog>
                           <div className="">
                              <Dialog>
                                 <DialogTrigger>
                                    <div
                                       className={`flex items-center gap-2 border-[1px] rounded-[7px] px-2 py-1`}
                                    >
                                       <PlusCircle className="w-[18px] h-[18px] cursor-pointer text-[#405189]" />
                                    </div>
                                 </DialogTrigger>
                                 <DialogContent className="rounded-[10px]">
                                    <UpdateItems
                                       status={{ data: statusPO }}
                                       id={`${row.original.id}`}
                                    />
                                 </DialogContent>
                              </Dialog>
                           </div>
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
