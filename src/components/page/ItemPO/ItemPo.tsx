'use client';
import { DataTable } from '@/components/table/DataTabel';
import { ItemPOColumns } from '@/components/table/columns';
import { CanRule } from '@/hooks/Can';
import { UseQueryFetching } from '@/hooks/UseQueryFetch';
import { AllItemType } from '@/types';
import { Roboto } from 'next/font/google';
import { useState } from 'react';
import { randomData } from './dataDummy';

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });
const status = ['ALL', 'PROCESS', 'CANCELED', 'FINISH', ' UNPROCESSED'];

const ItemPO = () => {
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

   const { data, isLoading, isError } = UseQueryFetching<AllItemType>(url, [
      'getAllItems',
      page,
      statusQuery,
   ]);

   if (isError) {
      return <div>Erorr 404</div>;
   }

   const noPo = data?.data.items.find((item: any) => item.no === purchaseOrder);
   return (
      <div className="lg:w-full lg:bg-white px-[12px] lg:gap-[12px] lg:pt-[20px] lg:rounded-[10px]">
         <div className="flex bg-[#fff] justify-between items-center rounded-[7px] p-2 mb-[10px]">
            <div className="h-full hidden lg:flex gap-[10px] text-[14px]  bg-gray-50 overflow-hidden w-max">
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
         </div>
         <div className="w-full ">
            <DataTable
               data={randomData}
               type={'item'}
               columns={ItemPOColumns}
            />
         </div>
      </div>
   );
};

export default ItemPO;
