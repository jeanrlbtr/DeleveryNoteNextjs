import ClientFetching from '@/hooks/clientFetching';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { detailNoteColumn } from './columns';
import { Button } from '../ui/button';
import { DataTableDetail } from './DataTableDetail';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Timeline } from '../item';
import { ArrowUpRightFromCircle } from 'lucide-react';

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
        <Button className='bg-[#405189] hover:bg-[#6862d4]'>Update Status</Button>
        <Button className='bg-[#405189] hover:bg-[#6862d4]'>Print</Button>
      </div>
      <div className='mt-[40px] h-max flex gap-[20px]'>
        <div className=' bg-white shadow-md h-max w-[100vw] md:w-[75vw] rounded-[20px]'>
          <h1 className='ml-[10px] mt-[10px] text-[24px] text-[#202020]'>Purchase Order</h1>
          <div className='overflow-x-auto h-full'>
            <div className='w-max'>
              <DataTableDetail
                type={'detail'}
                data={[data]}
                columns={detailNoteColumn}
              >
                {(row: any) => {
                  return (
                    <div>
                      <ul className='w-full'>
                        {row.original.timeline.map((data: any, index: number) => {
                          const date = new Date(data.timestamp * 1000).toDateString();
                          const time = new Date(data.timestamp * 1000).toLocaleTimeString();
                          return (
                            <div
                              key={index}
                              className={``}
                            >
                              <li className={`p-3 mt-[15px] text-[#3d3d3d]  border-[1px] flex gap-[12px] h-max w-[300px]  rounded-[5px] `}>
                                <div className='w-[8px]  bg-[#405189] rounded-[4px]' />
                                <div className='flex flex-col gap-[5px]'>
                                  <p
                                    className={`${
                                      data.status == 'FINISH' ? 'bg-[green] text-white' : 'bg-[yellow] text-black'
                                    } px-[4px] w-max rounded-[4px] `}
                                  >
                                    {data.status}
                                  </p>
                                  <p>
                                    UpdatedBy :
                                    {data.updatedBy && <span className='ml-[2px] font-[500] text-[black] capitalize'>{data.updatedBy}</span>}
                                  </p>
                                  <p>
                                    Note :{data.note && <span className='border-[1px] text-[black] rounded-[5px] ml-[5px] px-2'>{data.note}</span>}
                                  </p>
                                </div>
                              </li>
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
        <div className='min-w-[200px] w-full max-w-[400px] md:h-[65vh] overflow-y-auto bg-white shadow-md rounded-[15px] px-[10px] pb-[10px]'>
          <p className=' mt-[10px] text-[24px] text-[#202020]'>Items</p>
          {data.items.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className='mt-[10px] gap-[12px] flex items-center bg-[#2a47ca11] p-2 rounded-[10px]'
              >
                <div className='w-full '>
                  <div className='flex w-full justify-between items-center'>
                    <p className='text-black text-[20px]'>Vetto (putih)</p>
                    <Dialog>
                      <DialogTrigger>
                        <ArrowUpRightFromCircle className='w-[15px] h-[15px] cursor-pointer text-[#405189]' />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            <p className='text-[30px] text-[#525252] font-[500]'>Timeline Items</p>
                          </DialogTitle>
                        </DialogHeader>
                        <Timeline dataItems={{}} />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className='flex mt-[2px]  justify-between text-[14px] w-full'>
                    <p className='text-[#626262] '>Kursi</p>
                    <p className='text-black'>Quantity : 10</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className='mt-[40px] max-w-[100vw]  bg-[#fafafa] rounded-[5px]'>
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
      </div> */}
      {/* <div className='mt-[40px] bg-[#fafafa] rounded-[5px]'>
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
                            <Timeline dataItems={row.original} />
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
      </div> */}
    </div>
  );
};

export default TableDetailNote;
