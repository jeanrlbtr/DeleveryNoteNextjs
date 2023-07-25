'use client';

import ClientFetching from '@/hooks/clientFetching';
import { DataTable } from './DataTabel';
import { columnsDelevery } from './columns';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import TableLoading from './TableLoading';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

const TableNote = () => {
  const filter = [
    { query: 'all', title: 'All Items' },
    { query: 'status', title: 'Status' },
    { query: 'salesSearch', title: 'Sales' },
    { query: 'noSearch', title: 'No SJ' },
    { query: 'recipientSearch', title: 'Recipient Search' },
  ];
  const status = ['PROCESS', 'CANCELED', 'UNCOMPLETED', 'FINISH', ' UNPROCESSED'];
  const [searchValue, setSearchValue] = useState<string>('');
  const [statusValue, setStatusValue] = useState<string>('');
  const [selectValue, setSelectValue] = useState<string>('all');
  const [page, setPage] = useState<number>(1);
  const { push } = useRouter();
  const axiosFetching = ClientFetching();
  const debounceValue = useDebounce(searchValue, 1000);
  const { data: dataNote, isLoading } = useQuery({
    queryKey: ['getNote', debounceValue, statusValue, page],
    queryFn: async () => {
      const url =
        selectValue != 'status' && selectValue != 'all' && debounceValue
          ? `/delivery/v1/notes?k=${selectValue}&v=${debounceValue}&page=${page}&limit=100`
          : selectValue === 'status'
          ? `/delivery/v1/notes?k=${selectValue}&v=${statusValue}&page=${page}&limit=100`
          : `/delivery/v1/notes?page=${page}&limit=100`;
      const res = await axiosFetching.get(url);
      return res.data.data;
    },
  });
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='w-[500px] h-max p-2 rounded-[5px] gap-[20px] flex items-center'>
          <Select
            onValueChange={(e) => {
              setSelectValue(e);
              if (e === 'all') {
                setStatusValue('ALL');
              }
              setSearchValue('');
            }}
          >
            <SelectTrigger className='w-[250px] gap-[12px] bg-[white]'>
              <SelectValue placeholder='Select Filter' />
            </SelectTrigger>
            <SelectContent>
              {filter.map((filterItem: any, index: number) => {
                return (
                  <SelectItem
                    value={filterItem.query}
                    key={index}
                  >
                    {filterItem.title}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {selectValue !== 'status' ? (
            <div className='flex items-center px-[10px] border-[1px] rounded-[5px] py-[5px] bg-white'>
              <input
                placeholder='Search'
                className={`w-full outline-none border-none ${selectValue === 'all' && 'cursor-not-allowed'}`}
                disabled={selectValue === 'all'}
                id='inputSelect'
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <Search className='text-[#919191]' />
            </div>
          ) : (
            <div className='w-full'>
              <Select onValueChange={(e) => setStatusValue(e)}>
                <SelectTrigger className='w-[80%] text-[13px] gap-[10px]  bg-white '>
                  <SelectValue placeholder='Status PO' />
                </SelectTrigger>
                <SelectContent>
                  {status.map((status: any, index: number) => {
                    return (
                      <SelectItem
                        value={status}
                        key={index}
                      >
                        <div>{status}</div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
      <DataTable
        type='note'
        columns={columnsDelevery}
        disabledNext={dataNote?.currentPage === 1 || dataNote?.count === 0}
        disabledPrev={dataNote?.currentPage === dataNote?.totalPages || dataNote?.count === 0}
        nextPage={() => {
          dataNote?.currentPage !== dataNote?.totalPages && setPage(dataNote?.currentPage + 1);
        }}
        previousPage={() => {
          if (dataNote?.currentPage !== 1) setPage(dataNote?.currentPage - 1);
        }}
        data={dataNote?.notes || []}
        action={true}
        isLoading={isLoading}
      >
        {(row: any) => {
          return (
            <div
              className='bg-[#405189] py-1 px-[10px] text-center cursor-pointer text-white rounded-[6px] text-[14px]'
              onClick={() => push(`/notes/no=${row.original?.no}`)}
            >
              Detail
            </div>
          );
        }}
      </DataTable>
    </div>
  );
};

export default TableNote;
