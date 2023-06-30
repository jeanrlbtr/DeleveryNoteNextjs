'use client';
import { DataTable } from './DataTabel';
import { columnsDelevery } from './columns';
import { useRouter } from 'next/navigation';

interface Props {
  data: any[];
}

const TableNote = ({ data }: Props) => {
  const { push } = useRouter();
  return (
    <DataTable
      columns={columnsDelevery}
      data={data}
      action={true}
    >
      {(row: any) => {
        return (
          <div
            className='bg-[green] py-1 px-[10px] text-center cursor-pointer text-white rounded-[6px] text-[14px]'
            onClick={() => push(`/notes?no=${row.original?.no}`)}
          >
            Detail
          </div>
        );
      }}
    </DataTable>
  );
};

export default TableNote;
