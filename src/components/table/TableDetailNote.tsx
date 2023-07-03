import ClientFetching from '@/hooks/clientFetching';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { detailNoteColumn, historyColumn, itemColumn } from './columns';
import { Button } from '../ui/button';
import { DataTableDetail } from './DataTableDetail';

const TableDetailNote = ({ param }: { param: string }) => {
  const axiosFetching = ClientFetching();
  const { data, isLoading } = useQuery({
    queryKey: ['getDetailNotes'],
    queryFn: async () => {
      const res = await axiosFetching.get(`/delivery/v1/note?no=${param}`);
      return res.data.data;
    },
  });
  if (isLoading) {
    return <div>Loading please wait ....</div>;
  }
  return (
    <div className='pb-[50px]'>
      <div className=' flex gap-[15px]'>
        <Button className='bg-[#22966C]'>Update Status</Button>
        <Button className='bg-[#375F50]'>Print</Button>
      </div>
      <div className='mt-[40px]'>
        <h1 className='ml-[10px] text-[24px] text-[#525252]'>PO Detail</h1>
        <DataTableDetail
          type={'detail'}
          data={[data]}
          columns={detailNoteColumn}
        ></DataTableDetail>
      </div>
      <div className='mt-[40px]'>
        <h1 className='ml-[10px] text-[24px] text-[#525252]'>History</h1>
        <DataTableDetail
          type={'detail'}
          data={data.history}
          columns={historyColumn}
        ></DataTableDetail>
      </div>
      <div className='mt-[40px]'>
        <h1 className='ml-[10px] text-[24px] text-[#525252]'>Items</h1>
        <DataTableDetail
          type={'detail'}
          data={data.items}
          columns={itemColumn}
        ></DataTableDetail>
      </div>
    </div>
  );
};

export default TableDetailNote;
