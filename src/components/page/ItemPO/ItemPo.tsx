'use client';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import React, { useState } from 'react';
import { Roboto } from 'next/font/google';
import ClientFetching from '@/hooks/clientFetching';
import { useQuery } from '@tanstack/react-query';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Clock3 } from 'lucide-react';
import { Timeline } from '@/components/item';

import UpdateItems from '@/components/item/Form/UpdateStatusItems';
import { Button } from '@/components/ui/button';
import LoadingItemPo from './LoadingItemPo';
import Image from 'next/image';
import { Can } from '@/hooks/Can';

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });
const status = ['ALL', 'PROCESS', 'CANCELED', 'FINISH', ' UNPROCESSED'];

const ItemPO = () => {
   const status1 = [
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
         name: 'Process',
         key: 'PROCESS',
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

   const [page, setPage] = useState<number>(1);
   const [statusQuery, setStatusQuery] = useState<string>('ALL');
   const [purchaseOrder, setPurchaseOrder] = useState<string>('all');
   const axiosFetching = ClientFetching();

   const { data, isLoading, isError } = useQuery({
      queryFn: async () => {
         const url =
            statusQuery !== 'ALL'
               ? `/delivery/v1/note/items?k=status&v=${statusQuery}&page=${page}`
               : `/delivery/v1/note/items?page=${page}`;
         const res = await axiosFetching.get(url);
         return res.data?.data;
      },
      enabled: true,
      queryKey: ['getAllItems', page, statusQuery],
   });

   if (isError) {
      return <div>Erorr 404</div>;
   }

   const noPo = data?.items.find((item: any) => item.no === purchaseOrder);

   return (
      <div className=" lg:w-full lg:bg-white px-[12px] lg:gap-[12px] lg:pt-[20px] lg:rounded-[10px]">
         <div className="flex bg-[#fff] justify-between items-center rounded-[7px] p-2 flex-row-reverse mb-[10px]">
            <Select
               onValueChange={(e) => setPurchaseOrder(e)}
               value={purchaseOrder}
            >
               <SelectTrigger className="min-w-[180px] max-w-[220px] lg:text-[17px] text-[#646464] bg-white">
                  <SelectValue placeholder="Purchase Order" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="all">All Purchase Order</SelectItem>
                  {data?.items.map((purchaseOrder: any, index: number) => {
                     return (
                        <SelectItem value={purchaseOrder.no} key={index}>
                           <div>{purchaseOrder.no}</div>
                        </SelectItem>
                     );
                  })}
               </SelectContent>
            </Select>
            <Select onValueChange={(e) => setStatusQuery(e)}>
               <SelectTrigger className="w-max text-[13px] gap-[10px]  bg-white lg:hidden border-[#1d3f72]">
                  <SelectValue placeholder="Status Items" />
               </SelectTrigger>
               <SelectContent>
                  {status.map((status: any, index: number) => {
                     return (
                        <SelectItem value={status} key={index}>
                           <div>{status}</div>
                        </SelectItem>
                     );
                  })}
               </SelectContent>
            </Select>
            <div className="h-full hidden lg:flex gap-[10px] text-[14px]  bg-white overflow-hidden w-max">
               {status1.map((statusItem: any, index: number) => {
                  return (
                     <button
                        key={index}
                        onClick={() => {
                           setPurchaseOrder('all');
                           setStatusQuery(statusItem.key);
                        }}
                        className={`px-[8px] lg:text-[17px] ${
                           statusQuery == statusItem.key
                              ? 'bg-[#f7f7f7] rounded-[5px] text-[#525252]'
                              : 'text-[#807f7f]'
                        } py-[8px]`}
                     >
                        {statusItem.name}
                     </button>
                  );
               })}
            </div>
         </div>
         <div className="w-full ">
            <div
               className={`lg:h-[65vh] lg:bg-[#fdfdfd] lg:rounded-[10px] lg:overflow-y-auto`}
            >
               {purchaseOrder === 'all' ? (
                  <div className="w-full">
                     {isLoading && <LoadingItemPo />}
                     {data?.items.length > 0 ? (
                        data?.items.map((purchaseOrder: any, index: number) => {
                           return (
                              <div
                                 key={index}
                                 className={`w-full h-max p-2 rounded-[5px] bg-[transparent] mt-[30px]`}
                              >
                                 <div
                                    className={`flex justify-between items-center  ${roboto.className}`}
                                 >
                                    <p className="text-[18px] text-[#525252] font-[500]">
                                       {purchaseOrder.no}
                                    </p>
                                 </div>
                                 {purchaseOrder.items &&
                                    purchaseOrder.items.map(
                                       (itemDetail: any, index: number) => {
                                          const updatedBy =
                                             itemDetail.itemProgress.length - 1;
                                          return (
                                             <div
                                                key={index}
                                                className={`p-[10px] ${
                                                   index === 0 && 'mt-[10px]'
                                                }  hover:bg-[#2a47ca11] border-t-[1px]`}
                                             >
                                                <div className="w-full ">
                                                   <div className="flex w-full justify-between items-center">
                                                      <p className="text-[#333333] text-[20px]">
                                                         {itemDetail.name}
                                                         <span
                                                            className={`ml-[4px] text-[15px] ${
                                                               itemDetail.status !==
                                                               'FINISH'
                                                                  ? 'text-[#b88c3b]'
                                                                  : 'text-[green]'
                                                            }`}
                                                         >
                                                            (
                                                            {itemDetail.status ||
                                                               'UnProcess'}
                                                            )
                                                         </span>
                                                      </p>
                                                      <div className="flex items-center flex-row-reverse gap-[12px]">
                                                         <Dialog>
                                                            <DialogTrigger>
                                                               <Clock3 className="w-[20px] h-[20px] cursor-pointer text-[#405189]" />
                                                            </DialogTrigger>
                                                            <DialogContent className="rounded-[10px]">
                                                               <DialogHeader>
                                                                  <DialogTitle>
                                                                     <p className="text-[20px] text-[#525252] font-[500]">
                                                                        Timeline
                                                                        Items
                                                                     </p>
                                                                  </DialogTitle>
                                                               </DialogHeader>
                                                               <Timeline
                                                                  dataItems={
                                                                     itemDetail.itemProgress
                                                                  }
                                                               />
                                                            </DialogContent>
                                                         </Dialog>
                                                      </div>
                                                   </div>
                                                   <div className="flex mt-[2px]  justify-between text-[14px] w-full">
                                                      <p className="text-[#626262]">
                                                         {itemDetail.type}{' '}
                                                         <span className="ml-[2px]">
                                                            (
                                                            {itemDetail.variant}
                                                            )
                                                         </span>
                                                      </p>
                                                      <p className="text-black">
                                                         Quantity :{' '}
                                                         {itemDetail.qty}
                                                      </p>
                                                   </div>
                                                </div>
                                                <div className="flex justify-between mt-[6px]">
                                                   <p className="text-[#626262] text-[14px]">
                                                      {itemDetail.itemProgress[
                                                         updatedBy
                                                      ] &&
                                                         itemDetail
                                                            .itemProgress[
                                                            updatedBy
                                                         ].user.name}
                                                   </p>
                                                   <Can I="update" a="poItem">
                                                      <Dialog>
                                                         <DialogTrigger
                                                            disabled={
                                                               itemDetail.status ===
                                                               'FINISH'
                                                            }
                                                         >
                                                            <div
                                                               className={`text-[14px] ${
                                                                  roboto.className
                                                               } ${
                                                                  itemDetail.status ===
                                                                     'FINISH' &&
                                                                  'bg-[#a8a8a8] cursor-not-allowed'
                                                               }  bg-[#1d3f72] text-white px-2 py-1 rounded-[5px]`}
                                                            >
                                                               Update Process
                                                            </div>
                                                         </DialogTrigger>
                                                         <DialogContent className="rounded-[10px]">
                                                            <UpdateItems
                                                               id={
                                                                  itemDetail.id
                                                               }
                                                            />
                                                         </DialogContent>
                                                      </Dialog>
                                                   </Can>
                                                </div>
                                             </div>
                                          );
                                       }
                                    )}
                              </div>
                           );
                        })
                     ) : (
                        <div className="w-full flex bg-[#fdfdfd] justify-center">
                           {!isLoading && (
                              <div className="overflow-hidden relative w-[350px] h-[400px]">
                                 <Image
                                    src={'/animate.gif'}
                                    fill
                                    alt=""
                                    quality={100}
                                    className="object-contain"
                                 />
                              </div>
                           )}
                        </div>
                     )}
                  </div>
               ) : (
                  <div>
                     {noPo && (
                        <div className="w-full h-max p-2 rounded-[5px] bg-white mt-[30px]">
                           <div
                              className={`flex justify-between items-center  ${roboto.className}`}
                           >
                              <p className="text-[18px] text-[#525252] font-[500]">
                                 {noPo.no}
                              </p>
                           </div>
                           {noPo.items.map((itemDetail: any, index: number) => {
                              return (
                                 <div
                                    key={index}
                                    className={`p-[10px] ${
                                       index === 0 && 'mt-[10px]'
                                    }  hover:bg-[#2a47ca11] border-t-[1px]`}
                                 >
                                    <div className="w-full ">
                                       <div className="flex w-full justify-between items-center">
                                          <p className="text-[#333333] text-[20px]">
                                             {itemDetail.name}{' '}
                                             <span
                                                className={`ml-[4px] text-[15px] ${
                                                   itemDetail.status !==
                                                   'FINISH'
                                                      ? 'text-[#b88c3b]'
                                                      : 'text-[green]'
                                                }`}
                                             >
                                                (
                                                {itemDetail.status ||
                                                   'UnProcess'}
                                                )
                                             </span>
                                          </p>
                                          <div className="flex items-center flex-row-reverse gap-[12px]">
                                             <Dialog>
                                                <DialogTrigger>
                                                   <Clock3 className="w-[20px] h-[20px] cursor-pointer text-[#405189]" />
                                                </DialogTrigger>
                                                <DialogContent className="rounded-[10px]">
                                                   <DialogHeader>
                                                      <DialogTitle>
                                                         <p className="text-[20px] text-[#525252] font-[500]">
                                                            Timeline Items
                                                         </p>
                                                      </DialogTitle>
                                                   </DialogHeader>
                                                   <Timeline dataItems={{}} />
                                                </DialogContent>
                                             </Dialog>
                                          </div>
                                       </div>
                                       <div className="flex mt-[2px]  justify-between text-[14px] w-full">
                                          <p className="text-[#626262]">
                                             {itemDetail.type}{' '}
                                             <span className="ml-[2px]">
                                                ({itemDetail.variant})
                                             </span>
                                          </p>
                                          <p className="text-black">
                                             Quantity : {itemDetail.qty}
                                          </p>
                                       </div>
                                    </div>
                                    <div className="flex justify-end mt-[6px]">
                                       <Dialog>
                                          <DialogTrigger
                                             disabled={
                                                itemDetail.status === 'FINISH'
                                             }
                                          >
                                             <div
                                                className={`text-[14px] ${
                                                   roboto.className
                                                } ${
                                                   itemDetail.status ===
                                                      'FINISH' &&
                                                   'bg-[#a8a8a8] cursor-not-allowed'
                                                }  bg-[#1d3f72] text-white px-2 py-1 rounded-[5px]`}
                                             >
                                                Update Process
                                             </div>
                                          </DialogTrigger>
                                          <DialogContent className="rounded-[10px]">
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
            <div className="flex items-center justify-end space-x-2 py-4">
               <Button
                  variant="outline"
                  size="sm"
                  className="text-[#525252]"
                  disabled={data?.currentPage === 1 || data?.count === 0}
                  onClick={() => {
                     if (data?.currentPage !== 1)
                        setPage(data?.currentPage - 1);
                  }}
               >
                  Previous
               </Button>
               <Button
                  variant="outline"
                  size="sm"
                  className="text-[#525252]"
                  disabled={
                     data?.currentPage === data?.totalPages || data?.count === 0
                  }
                  onClick={() => {
                     if (data?.currentPage !== data?.totalPages)
                        setPage(data?.currentPage + 1);
                  }}
               >
                  Next
               </Button>
            </div>
         </div>
      </div>
   );
};

export default ItemPO;
