'use client';

import ClientFetching from '@/hooks/clientFetching';
import { DataTable } from './DataTabel';
import { columnsDelevery } from './columns';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import TableLoading from './TableLoading';

const TableNote = () => {
  const { push } = useRouter();
  const axiosFetching = ClientFetching();

  const { data: dataNote, isLoading } = useQuery({
    queryKey: ['getNote'],
    queryFn: async () => {
      const res = await axiosFetching.get('/delivery/v1/notes?page=1&limit=100');
      return res.data.data.notes;
    },
  });
  if (isLoading) {
    return <TableLoading />;
  }
  return (
    <DataTable
      columns={columnsDelevery}
      data={dataNote}
      action={true}
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
  );
};

export default TableNote;
