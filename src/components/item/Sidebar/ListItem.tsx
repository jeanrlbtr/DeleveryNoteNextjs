'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState } from 'react';
import { Roboto } from 'next/font/google';
import ClientFetching from '@/hooks/clientFetching';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Clock3 } from 'lucide-react';
import Timeline from '../modal/ModalTimeline';

import UpdateItems from '../Form/UpdateStatusItems';
import { Button } from '@/components/ui/button';

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });
const status = ['ALL', 'PROCESS', 'CANCELED', 'UNCOMPLETED', 'FINISH', ' UNPROCESSED'];

const ListItem = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [statusQuery, setStatusQuery] = useState<string>('ALL');
  const [purchaseOrder, setPurchaseOrder] = useState<string>('all');
  const axiosFetching = ClientFetching();
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const url = statusQuery !== 'ALL' ? `/delivery/v1/note/items?k=status&v=${statusQuery}&page=${page}` : `/delivery/v1/note/items?page=${page}`;
      const res = await axiosFetching.get(url);
      return res.data.data;
    },
    enabled: true,
    queryKey: ['getAllItems', page, statusQuery],
  });
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>Erorr 404</div>;
  }

  const noPo = data.items.find((item: any) => item.no === purchaseOrder);

  return (
    <div className=' lg:w-full lg:flex lg:gap-[12px]'>
      <div className='w-[400px] hidden lg:flex lg:flex-col bg-[white] h-[70vh] overflow-y-auto rounded-[5px] px-3'>
        <p className='text-[22px] text-[#525252] pl-2'>Purchase Order</p>
        <div className=' mt-[25px]'>
          {data.items.map((purchaseOrder: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => setPurchaseOrder(purchaseOrder.no)}
                className={` ${
                  noPo && purchaseOrder.no === noPo.no ? 'bg-[#0040ff3d] text-[#324cc0]' : 'hover:bg-[#0040ff1a]'
                } w-full flex justify-between items-center mt-[2px] pl-2 py-2 rounded-[6px] text-[#3e3e3e]`}
              >
                <p className='cursor-pointer'>{purchaseOrder.no}</p>
                <p
                  className={`text-[13px] ${
                    noPo && purchaseOrder.no === noPo.no ? 'bg-[#1d3f72] text-[white]' : ' bg-[#0040ff3d]'
                  } w-[50px] h-max rounded-[10px] py-[2px] mr-[10px] text-center`}
                >
                  {purchaseOrder.items.length}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className='flex lg:hidden justify-between'>
        <Select
          onValueChange={(e) => setPurchaseOrder(e)}
          value={purchaseOrder}
        >
          <SelectTrigger className='w-[180px]  bg-white border-[#1d3f72]'>
            <SelectValue placeholder='Purchase Order' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Purchase Order</SelectItem>
            {data.items.map((purchaseOrder: any, index: number) => {
              return (
                <SelectItem
                  value={purchaseOrder.no}
                  key={index}
                >
                  <div>{purchaseOrder.no}</div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select onValueChange={(e) => setStatusQuery(e)}>
          <SelectTrigger className='w-max text-[13px] gap-[10px]  bg-white border-[#1d3f72]'>
            <SelectValue placeholder='Status Items' />
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
      <div className='w-full '>
        <div className='lg:h-[70vh] lg:bg-white lg:rounded-[5px] lg:overflow-y-auto'>
          <div className='mt-[10px] hidden lg:flex lg:gap-[20px] px-2'>
            <Button
              className='bg-[#1d3f72] hover:bg-[#3f46a8fd]'
              onClick={() => setPurchaseOrder('all')}
            >
              All Items
            </Button>
            <Select onValueChange={(e) => setStatusQuery(e)}>
              <SelectTrigger className='w-max h-max text-[13px] gap-[10px]  bg-white border-[#1d3f72]'>
                <SelectValue placeholder='Status Items' />
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
          {purchaseOrder === 'all' ? (
            <div className='w-full'>
              {data.items.length > 0 &&
                data.items.map((purchaseOrder: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`w-full h-max p-2 rounded-[5px] bg-white mt-[30px] `}
                    >
                      <div className={`flex justify-between items-center  ${roboto.className}`}>
                        <p className='text-[18px] text-[#525252] font-[500]'>{purchaseOrder.no}</p>
                      </div>
                      {purchaseOrder.items.map((itemDetail: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className={`p-[10px] ${index === 0 && 'mt-[10px]'}  hover:bg-[#2a47ca11] border-t-[1px]`}
                          >
                            <div className='w-full '>
                              <div className='flex w-full justify-between items-center'>
                                <p className='text-[#333333] text-[20px]'>
                                  {itemDetail.name}{' '}
                                  <span className={`ml-[4px] text-[15px] ${itemDetail.status !== 'FINISH' ? 'text-[#b88c3b]' : 'text-[green]'}`}>
                                    ({itemDetail.status || 'UnProcess'})
                                  </span>
                                </p>
                                <div className='flex items-center flex-row-reverse gap-[12px]'>
                                  <Dialog>
                                    <DialogTrigger>
                                      <Clock3 className='w-[20px] h-[20px] cursor-pointer text-[#405189]' />
                                    </DialogTrigger>
                                    <DialogContent className='rounded-[10px]'>
                                      <DialogHeader>
                                        <DialogTitle>
                                          <p className='text-[20px] text-[#525252] font-[500]'>Timeline Items</p>
                                        </DialogTitle>
                                      </DialogHeader>
                                      <Timeline dataItems={{}} />
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>
                              <div className='flex mt-[2px]  justify-between text-[14px] w-full'>
                                <p className='text-[#626262]'>
                                  {itemDetail.type} <span className='ml-[2px]'>({itemDetail.variant})</span>
                                </p>
                                <p className='text-black'>Quantity : {itemDetail.qty}</p>
                              </div>
                            </div>
                            <div className='flex justify-end mt-[6px]'>
                              <Dialog>
                                <DialogTrigger disabled={itemDetail.status === 'FINISH'}>
                                  <div
                                    className={`text-[14px] ${roboto.className} ${
                                      itemDetail.status === 'FINISH' && 'bg-[#a8a8a8] cursor-not-allowed'
                                    }  bg-[#1d3f72] text-white px-2 py-1 rounded-[5px]`}
                                  >
                                    Update Process
                                  </div>
                                </DialogTrigger>
                                <DialogContent className='rounded-[10px]'>
                                  <UpdateItems id={itemDetail.id} />
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          ) : (
            <div>
              {noPo && (
                <div className='w-full h-max p-2 rounded-[5px] bg-white mt-[30px]'>
                  <div className={`flex justify-between items-center  ${roboto.className}`}>
                    <p className='text-[18px] text-[#525252] font-[500]'>{noPo.no}</p>
                  </div>
                  {noPo.items.map((itemDetail: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`p-[10px] ${index === 0 && 'mt-[10px]'}  hover:bg-[#2a47ca11] border-t-[1px]`}
                      >
                        <div className='w-full '>
                          <div className='flex w-full justify-between items-center'>
                            <p className='text-[#333333] text-[20px]'>
                              {itemDetail.name}{' '}
                              <span className={`ml-[4px] text-[15px] ${itemDetail.status !== 'FINISH' ? 'text-[#b88c3b]' : 'text-[green]'}`}>
                                ({itemDetail.status || 'UnProcess'})
                              </span>
                            </p>
                            <div className='flex items-center flex-row-reverse gap-[12px]'>
                              <Dialog>
                                <DialogTrigger>
                                  <Clock3 className='w-[20px] h-[20px] cursor-pointer text-[#405189]' />
                                </DialogTrigger>
                                <DialogContent className='rounded-[10px]'>
                                  <DialogHeader>
                                    <DialogTitle>
                                      <p className='text-[20px] text-[#525252] font-[500]'>Timeline Items</p>
                                    </DialogTitle>
                                  </DialogHeader>
                                  <Timeline dataItems={{}} />
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                          <div className='flex mt-[2px]  justify-between text-[14px] w-full'>
                            <p className='text-[#626262]'>
                              {itemDetail.type} <span className='ml-[2px]'>({itemDetail.variant})</span>
                            </p>
                            <p className='text-black'>Quantity : {itemDetail.qty}</p>
                          </div>
                        </div>
                        <div className='flex justify-end mt-[6px]'>
                          <Dialog>
                            <DialogTrigger disabled={itemDetail.status === 'FINISH'}>
                              <div
                                className={`text-[14px] ${roboto.className} ${
                                  itemDetail.status === 'FINISH' && 'bg-[#a8a8a8] cursor-not-allowed'
                                }  bg-[#1d3f72] text-white px-2 py-1 rounded-[5px]`}
                              >
                                Update Process
                              </div>
                            </DialogTrigger>
                            <DialogContent className='rounded-[10px]'>
                              <UpdateItems id={itemDetail.id} />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        <div className='flex items-center justify-end space-x-2 py-4'>
          <Button
            variant='outline'
            size='sm'
            className='text-[#525252]'
            disabled={data.currentPage === 1 || data.count === 0}
            onClick={() => {
              if (data.currentPage !== 1) setPage(data.currentPage - 1);
            }}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='text-[#525252]'
            disabled={data.currentPage === data.totalPages || data.count === 0}
            onClick={() => {
              if (data.currentPage !== data.totalPages) setPage(data.currentPage + 1);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
