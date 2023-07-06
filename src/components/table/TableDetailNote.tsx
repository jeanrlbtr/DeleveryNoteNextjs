import ClientFetching from '@/hooks/clientFetching';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { allHistoryColumn, detailNoteColumn, historyColumn, itemColumn, itemHistoryColumn } from './columns';
import { Button } from '../ui/button';
import { DataTableDetail } from './DataTableDetail';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ModalTimeline } from '../item';
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
      <div className='mt-[40px] bg-[#fafafa] rounded-[5px]'>
        <h1 className='ml-[10px] text-[24px] text-[#525252]'>PO Detail</h1>
        <div className='overflow-x-auto'>
          <div className='w-max'>
            <DataTableDetail
              type={'detail'}
              data={[data]}
              columns={detailNoteColumn}
            >
              {(row: any) => {
                return (
                  <div>
                    <ul className='flex  w-full'>
                      {row.original.timeline.map((data: any, index: number) => {
                        const date = new Date(data.timestamp * 1000).toDateString();
                        const time = new Date(data.timestamp * 1000).toLocaleTimeString();
                        return (
                          <div
                            key={index}
                            className={`${index != 0 && 'pl-[30px]'}`}
                          >
                            <li
                              className={`p-3 text-[#3d3d3d] border-[1px] w-[300px] flex flex-col gap-[5px] border-l-[4px] rounded-[5px] ${
                                data.status == 'FINISH' ? 'border-[green] ' : 'border-[#b8b819]'
                              }`}
                            >
                              <p>UpdatedBy :{data.updatedBy && <span className='ml-[2px] capitalize'>{data.updatedBy}</span>}</p>

                              <p>
                                Status :{' '}
                                <span className={`${data.status == 'FINISH' ? 'bg-[green] text-white' : 'bg-[yellow]'} px-[4px] rounded-[4px] `}>
                                  {data.status}
                                </span>
                              </p>
                              <p>Note :{data.note && <span className='border-[1px] rounded-[5px] ml-[5px] px-2'>{data.note}</span>}</p>
                            </li>
                            <div className='flex justify-center items-center mt-[10px] gap-[10px]'>
                              <div
                                className={`w-[10px] h-[10px] ${data.status == 'FINISH' ? 'bg-[green] text-white' : 'bg-[#b8b819]'} rounded-[10px]`}
                              />
                              <p className='text-[#3d3d3d]  text-center'>
                                {date}, {time}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                );
              }}
            </DataTableDetail>
          </div>
        </div>
      </div>
      <div className='mt-[40px] max-w-[100vw]  bg-[#fafafa] rounded-[5px]'>
        <h1 className='ml-[10px] text-[24px] text-[#525252]'>History</h1>
        <div className='overflow-x-auto'>
          <div className='w-max'>
            <DataTableDetail
              type={'detail'}
              data={data.history}
              columns={historyColumn}
            >
              {(row: any) => {
                return (
                  <div>
                    {row.getIsExpanded() ? (
                      <div className='overflow-x-scroll'>
                        <DataTableDetail
                          data={[row.original]}
                          className='w-max'
                          columns={allHistoryColumn}
                          action={true}
                        >
                          {(row: any) => {
                            return (
                              <Button
                                size={'sm'}
                                className='bg-[green]'
                              >
                                Change Field
                              </Button>
                            );
                          }}
                        </DataTableDetail>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                );
              }}
            </DataTableDetail>
          </div>
        </div>
      </div>
      <div className='mt-[40px] bg-[#fafafa] rounded-[5px]'>
        <h1 className='ml-[10px] text-[24px] text-[#525252]'>Items</h1>
        <DataTableDetail
          type={'detail'}
          data={data.items}
          columns={itemColumn}
        >
          {(row: any) => {
            return (
              <div className=''>
                {row.getIsExpanded() ? (
                  <DataTableDetail
                    data={row.original.historyItems}
                    columns={itemHistoryColumn}
                    action={true}
                  >
                    {(row: any) => {
                      return (
                        <Dialog>
                          <DialogTrigger>
                            <div className='bg-[green] px-[9px] text-white py-[2px] rounded-[5px]'>Progress</div>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                <p className='text-[30px] text-[#525252] font-[500]'>Timeline Items</p>
                              </DialogTitle>
                            </DialogHeader>
                            <ModalTimeline dataItems={row.original} />
                          </DialogContent>
                        </Dialog>
                      );
                    }}
                  </DataTableDetail>
                ) : (
                  ''
                )}
              </div>
            );
          }}
        </DataTableDetail>
      </div>
    </div>
  );
};

export default TableDetailNote;
