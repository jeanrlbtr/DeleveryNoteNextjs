import ClientFetching from '@/hooks/clientFetching';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { detailNoteColumn } from '@/components/table/columns';
import { Button } from '@/components/ui/button';
import { DataTableDetail } from '@/components/table/DataTableDetail';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Timeline, UpdateStatusPO } from '@/components/item';
import { ArrowUpRightFromCircle } from 'lucide-react';
import { Roboto } from 'next/font/google';
import { Can } from '@/hooks/Can';

const roboto = Roboto({ weight: ['700', '300', '400', '500'], subsets: ['cyrillic'] });

const DetailPO = ({ param }: { param: string }) => {
  const axiosFetching = ClientFetching();
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useQuery({
    queryKey: ['getDetailNote'],
    queryFn: async () => {
      const res = await axiosFetching.get(`/delivery/v1/note?no=${param}`);
      return res.data.data;
    },
  });
  if (isLoading) {
    return <div>Loading please wait ....</div>;
  }

  const dateDelivery = new Date(data.dateDelivery).toDateString();
  return (
    <div className='pb-[50px]'>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent>
          <UpdateStatusPO no={data.no} />
        </DialogContent>
      </Dialog>
      <div className=' mb-[30px]'>
        <div>
          <p className='text-[#525252] text-[27px] font-[500]'>Ordinary Purchase Order</p>
          <p className='text-[15px]'>{dateDelivery}</p>
        </div>
        <div className={`flex justify-between mt-[40px]`}>
          <div>
            <p className='text-[19px] font-[500] text-black'>Status:</p>
            <p
              className={`font-[600] ${
                data.status === 'FINISH' ? 'text-[green] border-[green]' : 'text-[#f58123] border-[#f58123]'
              }  border-[1px] rounded-[5px] px-2 `}
            >
              {data.status || 'Unprocessed'}
            </p>
          </div>
          <div>
            <p className='text-[19px] text-black'>Sender Address:</p>
            <p className='border-[1px] rounded-[5px] p-1 text-[#242424] text-[16px]  w-[300px]'>{data.senderAddress}</p>
          </div>
          <div>
            <p className='text-[19px] text-black'>Recieptent Address:</p>
            <p className='border-[1px] rounded-[5px] p-1 text-[#242424] text-[16px]  w-[300px]'>{data.recipientAddress}</p>
          </div>
        </div>
      </div>
      <div className='flex gap-[13px]'>
        <Can
          I='update'
          a='po'
        >
          <Button
            onClick={() => setOpen(true)}
            className='bg-[#405189] text-[15px] text-white hover:bg-[#6862d4] z-0'
            disabled={data.status === 'FINISH'}
          >
            Update Status
          </Button>
        </Can>
        <Button className='bg-[#405189] hover:bg-[#6862d4]'>Print</Button>
      </div>
      <div className='bg-white rounded-[10px] py-[20px] mt-[40px] '>
        <div className=' bg-white shadow-md h-max w-[100vw] md:w-[100%] '>
          <h1 className='ml-[10px] mt-[10px] font-[500] text-[24px] text-[#474747]'>Purchase Order</h1>
          <div className='overflow-x-auto h-full'>
            <div className='mt-[20px] w-full'>
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
                              className={`relative`}
                            >
                              <li
                                className={`p-[18px] text-[#272727]  border-l-[2px] flex gap-[40px] justify-between h-max w-[600px] border-[#c4c4c4]`}
                              >
                                <div
                                  className={`${
                                    data.status == 'FINISH' ? 'bg-[green] text-white ' : 'bg-[#fff] text-black border-[2px] border-[#405189]'
                                  } w-[15px]  absolute h-[15px] top-0 left-[-6px] rounded-full`}
                                />
                                <div className=''>
                                  <p>{date}</p>
                                  <p>{time}</p>
                                </div>
                                <div className='flex flex-col gap-[5px] w-[400px]'>
                                  <p className={`w-max text-[#3d3d3d] text-[17px] rounded-[4px] `}>
                                    {data.status}
                                    <span className='text-[14px] ml-[5px] text-[#525252]'>({data.user === null ? 'System' : data.user.name})</span>
                                  </p>
                                  <p className=''>
                                    Note :{data.note && <span className='border-[1px] text-[#3d3d3d] ml-[5px] rounded-[4px] px-2'>{data.note}</span>}
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
        <div className='mt-[40px] min-w-[200px] w-full max-w-[400px] max-h-[230px]  overflow-y-auto bg-white shadow-md px-[10px] pb-[10px]'>
          <h1 className='ml-[10px] mt-[10px] font-[500] text-[24px] mb-[10px]  text-[#474747]'>Items</h1>
          {data.items.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className='p-[10px] hover:bg-[#2a47ca11] border-t-[1px]'
              >
                <div className='w-full '>
                  <div className='flex w-full justify-between items-center'>
                    <p className='text-[#333333] text-[20px]'>
                      {item.name}{' '}
                      <span className={`ml-[4px] text-[15px] ${item.status !== 'FINISH' ? 'text-[#b88c3b]' : 'text-[green]'}`}>
                        ({item.status || 'Unprocess'})
                      </span>
                    </p>
                    <Dialog>
                      <DialogTrigger>
                        <ArrowUpRightFromCircle className='w-[15px] h-[15px] cursor-pointer text-[#405189]' />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            <p className='text-[30px] text-[#525252] font-[500]'>Timeline Items ({item.name})</p>
                          </DialogTitle>
                        </DialogHeader>
                        <Timeline dataItems={item.itemProgress} />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className='flex mt-[2px] justify-between text-[14px] w-full'>
                    <p className='text-[#626262] '>
                      {item.type} <span className='ml-[2px]'>({item.variant})</span>
                    </p>
                    <p className='text-black'>Quantity : {item.qty}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailPO;
