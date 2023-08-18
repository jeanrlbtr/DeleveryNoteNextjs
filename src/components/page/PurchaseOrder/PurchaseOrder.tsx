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
import ClientFetching from '@/hooks/clientFetching';
import useDebounce from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
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
   const axiosFetching = ClientFetching();
   const debounceValue = useDebounce(searchValue, 1000);

   const { data: dataNote, isLoading } = useQuery({
      queryKey: ['getNote', debounceValue, statusValue, page, limitValue],
      queryFn: async () => {
         const statusUrl =
            statusValue && statusValue != 'ALL'
               ? `/delivery/v1/notes?k=status&v=${statusValue}&page=${page}&limit=${limitValue}`
               : `/delivery/v1/notes?page=${page}&limit=${limitValue}`;

         const url =
            selectValue && debounceValue.length > 1
               ? `/delivery/v1/notes?k=${selectValue}&v=${debounceValue}&page=${page}&limit=${limitValue}`
               : statusUrl;
         const res = await axiosFetching.get(url);

         return res.data.data;
      },
   });

   return (
      <div className="bg-white rounded-[7px] p-3">
         <div className="flex bg-[#fff] justify-between items-center  rounded-[7px] p-2">
            <div className="h-full rounded-[5px] text-[14px] bg-gray-50 overflow-hidden w-max">
               {status.map((statusItem: any, index: number) => {
                  return (
                     <button
                        key={index}
                        onClick={() => {
                           setStatusValue(statusItem.key);
                           setSearchValue('');
                           setSelectValue('');
                        }}
                        className={`px-[8px] ${
                           statusValue == statusItem.key
                              ? 'bg-gray-200 rounded-[5px] text-[#525252]'
                              : 'text-[#807f7f]'
                        } py-[8px] lg:text-[16px]`}
                     >
                        {statusItem.name}
                     </button>
                  );
               })}
            </div>
            <div className="w-[430px] h-max rounded-[5px] flex items-center">
               <Select
                  onValueChange={(e) => {
                     setStatusValue('');
                     setSearchValue('');
                     setSelectValue(e);
                  }}
               >
                  <SelectTrigger className="w-[330px] lg:text-[16px] rounded-l-[5px] rounded-r-[0] text-[#807f7f] gap-[12px] bg-[white]">
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
               <div className="flex items-center px-[10px] border-[1px] rounded-r-[5px] py-[6px] bg-white">
                  <input
                     placeholder="Search"
                     className={`w-full outline-none lg:text-[16px] border-none ${
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
                  <Search className="text-[#919191]" />
               </div>
            </div>
         </div>
         <div className="mt-[20px]">
            <DataTable
               type="note"
               columns={columnsDelevery}
               disabledNext={
                  dataNote?.currentPage === 1 || dataNote?.count === 0
               }
               disabledPrev={
                  dataNote?.currentPage === dataNote?.totalPages ||
                  dataNote?.count === 0
               }
               nextPage={() => {
                  dataNote?.currentPage !== dataNote?.totalPages &&
                     setPage(dataNote?.currentPage + 1);
               }}
               previousPage={() => {
                  if (dataNote?.currentPage !== 1)
                     setPage(dataNote?.currentPage - 1);
               }}
               data={dataNote?.notes || []}
               action={true}
               isLoading={isLoading}
               limit={limitValue}
               onChange={(e: string) => setLimitValue(e)}
            >
               {(row: any) => {
                  return (
                     <div
                        className="bg-[#405189] py-1 px-[10px] text-center cursor-pointer text-white rounded-[6px] text-[14px]"
                        onClick={() => push(`/notes/no=${row.original?.no}`)}
                     >
                        Detail
                     </div>
                  );
               }}
            </DataTable>
         </div>
      </div>
   );
};

export default PurchaseOrder;
