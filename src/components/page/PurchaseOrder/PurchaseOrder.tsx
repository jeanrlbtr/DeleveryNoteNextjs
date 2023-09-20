'use client';

import { DataTable } from '@/components/table/DataTabel';
import { columnsDelevery } from '@/components/table/columns';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { UseQueryFetching } from '@/hooks/UseQueryFetch';
import useDebounce from '@/hooks/useDebounce';
import { AllPurchaseOrder } from '@/types';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PurchaseOrder = () => {
   const filter = [
      { query: 'salesSearch', title: 'Sales' },
      { query: 'noSearch', title: 'No SJ' },
      { query: 'recipientSearch', title: 'Recipient Search' },
   ];

   const status = [
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
         name: 'InProgress',
         key: 'INPROGRESS',
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

   const [searchValue, setSearchValue] = useState<string>('');
   const [statusValue, setStatusValue] = useState<string>('ALL');
   const [limitValue, setLimitValue] = useState<string>('10');
   const [selectValue, setSelectValue] = useState<string>('all');
   const [page, setPage] = useState<number>(1);

   const { push } = useRouter();
   const debounceValue = useDebounce(searchValue, 1000);

   const statusUrl =
      statusValue && statusValue != 'ALL'
         ? `/delivery/v1/notes?k=status&v=${statusValue}&page=${page}&limit=${limitValue}`
         : `/delivery/v1/notes?page=${page}&limit=${limitValue}`;

   const url =
      selectValue && debounceValue.length > 1
         ? `/delivery/v1/notes?k=${selectValue}&v=${debounceValue}&page=${page}&limit=${limitValue}`
         : statusUrl;
   const queryKey = ['getNote', debounceValue, statusValue, page, limitValue];
   const { data: dataNote, isLoading } = UseQueryFetching<AllPurchaseOrder>(
      url,
      queryKey
   );

   return (
      <>
         <div className="h-full rounded-[5px] text-[14px] bg-gray-50 overflow-hidden mb-8 w-max">
            {status.map((statusItem: any, index: number) => {
               return (
                  <button
                     key={index}
                     onClick={() => {
                        setStatusValue(statusItem.key);
                        setSearchValue('');
                        setSelectValue('');
                     }}
                     className={`px-[8px] transition ${
                        statusValue == statusItem.key
                           ? 'bg-[#071952] dark:bg-blue-600 text-white'
                           : 'text-[#807f7f] hover:dark:bg-blue-400 hover:bg-[#2b3557] hover:text-white'
                     } py-[8px] lg:text-[16px]`}
                  >
                     {statusItem.name}
                  </button>
               );
            })}
         </div>
         <div className="dark:bg-container bg-white rounded-[7px] p-3">
            <div className="flex justify-between items-center rounded-[7px] p-2">
               <div className="w-[430px] h-max rounded-[5px] flex items-center">
                  <Select
                     onValueChange={(e) => {
                        setStatusValue('');
                        setSearchValue('');
                        setSelectValue(e);
                     }}
                  >
                     <SelectTrigger className="w-[330px] lg:text-[16px] rounded-l-[5px] rounded-r-[0] border-[1px] text-[#807f7f] gap-[12px] dark:bg-container">
                        <SelectValue placeholder="Select Filter" />
                     </SelectTrigger>
                     <SelectContent>
                        {filter.map((filterItem: any, index: number) => {
                           return (
                              <SelectItem value={filterItem.query} key={index}>
                                 {filterItem.title}
                              </SelectItem>
                           );
                        })}
                     </SelectContent>
                  </Select>
                  <div className="flex items-center px-[10px] border-[1px] rounded-r-[5px] py-[7px] bg-white dark:bg-container dark:border-white">
                     <input
                        placeholder="Search"
                        className={`w-full bg-transparent outline-none lg:text-[16px] border-none ${
                           selectValue === 'all' && 'cursor-not-allowed'
                        }`}
                        disabled={selectValue === 'all'}
                        id="inputSelect"
                        value={searchValue}
                        onChange={(e) => {
                           setStatusValue('');
                           setSearchValue(e.target.value);
                        }}
                     />
                     <Search className="text-gray-700 dark:text-[#f0f0f0]" />
                  </div>
               </div>
            </div>
            <div className="mt-[20px]">
               <DataTable
                  type="item"
                  columns={columnsDelevery}
                  disabledNext={
                     dataNote?.data.currentPage === 1 ||
                     dataNote?.data.count === 0
                  }
                  disabledPrev={
                     dataNote?.data.currentPage === dataNote?.data.totalPages ||
                     dataNote?.data.count === 0
                  }
                  nextPage={() => {
                     if (dataNote) {
                        dataNote?.data.currentPage !==
                           dataNote?.data.totalPages &&
                           setPage(dataNote.data.currentPage + 1);
                     }
                  }}
                  previousPage={() => {
                     if (dataNote) {
                        dataNote?.data.currentPage !== 1 &&
                           setPage(dataNote.data.currentPage - 1);
                     }
                  }}
                  data={dataNote?.data.notes || []}
                  action={true}
                  isLoading={isLoading}
                  limit={limitValue}
                  onChange={(e: string) => setLimitValue(e)}
               >
                  {(row: any) => {
                     return (
                        <div
                           className="dark:bg-blue-600 bg-container py-1 px-[10px] text-center cursor-pointer text-gray-50 font-medium rounded-[6px] text-[14px]"
                           onClick={() => push(`/notes/no=${row.original?.no}`)}
                        >
                           Detail
                        </div>
                     );
                  }}
               </DataTable>
            </div>
         </div>
      </>
   );
};

export default PurchaseOrder;
