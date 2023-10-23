'use client';

import { Timeline } from '@/components/item';
import ButtonTabs from '@/components/item/ButtonTabs/ButtonTabs';
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
import { GanttChart, Pencil, Search } from 'lucide-react';
import { useState } from 'react';

const ItemPurchaseOrder = ({ data: statusPO }: StatusItem) => {
   const allStatusPO = [{ name: 'View All', id: 0 }, ...statusPO];
   const Can = CanRule();
   const [page, setPage] = useState<number>(1);
   const [statusQuery, setStatusQuery] = useState<string | number>(0);

   const url =
      statusQuery !== 0
         ? `/delivery/v1/note/items?statusId=${statusQuery}&limit=${10}&page=${page}`
         : `/delivery/v1/note/items?page=${page}&limit=${10}`;

   const { data, isError } = UseQueryFetching<ItemPO>(url, [
      'getAllItems',
      page,
      statusQuery,
   ]);

   if (isError) {
      return <div>Erorr 404</div>;
   }
   const handleSetStatus = (id: number) => {
      setStatusQuery(id);
   };
   const disableNext = data && data.data.totalPages === page;
   const disablePrev = data && data.data.totalPages === 1;
   const handlePrevPage = () => {
      if (page !== 1) {
         setPage((prev) => prev - 1);
      }
   };

   const handleNextPage = () => {
      if (page >= 1) {
         setPage((prev) => prev + 1);
      }
   };
   return (
      <>
         <div className="h-full hidden mb-8 rounded-[8px] lg:flex text-[14px] border-blue-600 bg-gray-50 overflow-hidden w-max">
            {allStatusPO.map((statusItem: StatusT, index: number) => {
               return (
                  <ButtonTabs
                     key={index}
                     onClick={() => {
                        handleSetStatus(statusItem.id);
                     }}
                     statusValue={statusQuery}
                     statusItem={statusItem}
                  />
               );
            })}
         </div>
         <div className="lg:w-full bg-white dark:bg-container px-[12px] lg:gap-[12px] lg:pt-[20px] lg:rounded-[10px]">
            <div className="flex ml-2 border-[1px] w-[200px] mb-6 py-1 px-2 rounded-[5px] gap-4 items-center">
               <Search className="w-4 h-4 text-gray-500 dark:text-gray-50" />
               <input
                  type="text"
                  placeholder="Cari Item"
                  className=" w-[150px] dark:text-white placeholder:text-gray-500 bg-transparent placeholder:dark:text-[#a2b3eb] outline-none overflow-hidden"
               />
            </div>
            <div className="w-full">
               <DataTable
                  data={data?.data.items || []}
                  disabledNext={disableNext}
                  disabledPrev={disablePrev}
                  type={'item'}
                  columns={ItemPOColumns}
                  action={true}
                  previousPage={handlePrevPage}
                  nextPage={handleNextPage}
               >
                  {(row: Row<Item>) => {
                     const itemProgress = row.original.itemProgress;
                     return (
                        <div className="flex gap-4 w-full items-center">
                           <Dialog>
                              <DialogTrigger>
                                 <div
                                    className={`flex items-center gap-2 border-[1px] rounded-[7px] bg-white px-2 py-1`}
                                 >
                                    <GanttChart className="w-[18px] h-[18px] cursor-pointer transition-all text-[#405189]" />
                                 </div>
                              </DialogTrigger>
                              <DialogContent className="rounded-[10px] dark:bg-container">
                                 <DialogHeader>
                                    <DialogTitle>
                                       <p className="text-[20px] dark:text-white text-[#525252] font-[500]">
                                          {row.original.name}
                                       </p>
                                    </DialogTitle>
                                 </DialogHeader>
                                 <Timeline dataItems={itemProgress} />
                              </DialogContent>
                           </Dialog>
                           <div className="">
                              <Can I="read" a={'poItem'}>
                                 <Dialog>
                                    <DialogTrigger>
                                       <div
                                          className={`flex items-center gap-2 border-[1px] rounded-[7px] bg-white px-2 py-1`}
                                       >
                                          <Pencil className="w-[18px] h-[18px] cursor-pointer text-[#405189]" />
                                       </div>
                                    </DialogTrigger>
                                    <DialogContent className="rounded-[10px]">
                                       <UpdateItems
                                          status={{ data: statusPO }}
                                          id={`${row.original.id}`}
                                       />
                                    </DialogContent>
                                 </Dialog>
                              </Can>
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
