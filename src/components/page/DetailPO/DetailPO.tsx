'use client';

import { Timeline, UpdateStatusPO } from '@/components/item';
import { DataTableDetail } from '@/components/table/DataTableDetail';
import { detailNoteColumn } from '@/components/table/columns';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { CanRule } from '@/hooks/Can';
import { UseQueryFetching } from '@/hooks/UseQueryFetch';
import { DetailPoType, TimelineT } from '@/types';
import { ArrowUpRightFromCircle } from 'lucide-react';
import { useState } from 'react';

const DetailPO = ({
   detailPo,
   noPo,
}: {
   detailPo: DetailPoType;
   noPo: string;
}) => {
   const [open, setOpen] = useState<boolean>(false);
   const { data } = UseQueryFetching<DetailPoType>(
      `/delivery/v1/note?no=${noPo}`,
      ['getDetailNote'],
      detailPo
   );

   const detailPoData = data ? data.data : detailPo.data;
   const Can = CanRule();
   const dateDelivery = new Date(detailPoData.dateDelivery).toDateString();
   return (
      <div className="pb-[50px]">
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
               <UpdateStatusPO no={detailPoData.no} />
            </DialogContent>
         </Dialog>
         <div className=" mb-[30px]">
            <div>
               <p className="dark:text-[#fff] text-gray-600 text-[27px] font-[500]">
                  Ordinary Purchase Order
               </p>
               <p className="text-[15px] text-gray-500 dark:text-white">
                  {dateDelivery}
               </p>
            </div>
            <div className={`flex justify-between mt-[40px]`}>
               <div>
                  <p className="text-[19px] mb-1 font-[500] text-gray-600 dark:text-white">
                     Status
                  </p>
                  <p
                     className={`font-[600] ${
                        detailPoData.status === 'FINISH'
                           ? 'text-[green] border-[green]'
                           : 'text-[#f58123] border-[#f58123]'
                     }  border-[1px] rounded-[5px] px-2 `}
                  >
                     {detailPoData.status || 'Unprocessed'}
                  </p>
               </div>
               <div>
                  <p className="text-[19px] mb-1 text-gray-600 dark:text-white">
                     Sender Address
                  </p>
                  <p className="border-[1px] rounded-[5px] p-1 dark:border-gray-100 dark:text-[#fefefe] text-[16px]  w-[300px]">
                     {detailPoData.senderAddress}
                  </p>
               </div>
               <div>
                  <p className="text-[19px] mb-1 text-gray-600 dark:text-white">
                     Recieptent Address
                  </p>
                  <p className="border-[1px] rounded-[5px] p-1 dark:border-gray-100 dark:text-[#fefefe] text-[16px]  w-[300px]">
                     {detailPoData.recipientAddress}
                  </p>
               </div>
            </div>
         </div>
         <div className="flex gap-[13px]">
            <Can I="update" a="po">
               <Button
                  onClick={async () => setOpen(true)}
                  className="bg-container dark:bg-blue-600 text-[15px] hover:bg-[#302d70] text-white hover:dark:bg-blue-700 z-0"
                  disabled={detailPoData.status === 'FINISH'}
               >
                  Update Status
               </Button>
            </Can>
            <Button className="bg-container text-white dark:bg-blue-600 hover:dark:bg-blue-700 hover:bg-[#302d70]">
               Print
            </Button>
         </div>
         <div className="bg-white dark:bg-container rounded-[10px] py-[20px] mt-[40px] ">
            <div className=" bg-white dark:bg-container  shadow-md h-max w-[100vw] md:w-[100%] ">
               <h1 className="ml-[10px] mt-[10px] font-[500] dark:text-white text-[24px] text-[#474747]">
                  Purchase Order
               </h1>
               <div className="overflow-x-auto h-full">
                  <div className="mt-[20px] w-full">
                     {detailPoData && (
                        <DataTableDetail
                           type={'detail'}
                           data={[detailPoData]}
                           columns={detailNoteColumn}
                        >
                           {(row: any) => {
                              return (
                                 <div>
                                    <ul className="w-full">
                                       {row.original.timeline.map(
                                          (data: TimelineT, index: number) => {
                                             const date = new Date(
                                                data.timestamp * 1000
                                             ).toDateString();
                                             const time = new Date(
                                                data.timestamp * 1000
                                             ).toLocaleTimeString();
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
                                                            data.status ==
                                                            'FINISH'
                                                               ? 'bg-[green] text-white '
                                                               : 'bg-[#fff] text-white border-[2px] border-[#405189]'
                                                         } w-[15px]  absolute h-[15px] top-0 left-[-6px] rounded-full`}
                                                      />
                                                      <div className="dark:text-white">
                                                         <p>{date}</p>
                                                         <p>{time}</p>
                                                      </div>
                                                      <div className="flex flex-col gap-[5px] w-[400px]">
                                                         <p
                                                            className={`w-max dark:text-white text-[#3d3d3d] text-[17px] rounded-[4px] `}
                                                         >
                                                            {data.status}
                                                            <span className="text-[14px] ml-[5px] dark:text-white text-[#525252]">
                                                               (
                                                               {data.updatedBy ===
                                                               null
                                                                  ? 'System'
                                                                  : data.updatedBy}
                                                               )
                                                            </span>
                                                         </p>
                                                         <p className="dark:text-white">
                                                            Note :
                                                            {data.note && (
                                                               <span className="border-[1px] dark:border-gray-400 dark:text-white text-[#3d3d3d] ml-[5px] rounded-[4px] px-2">
                                                                  {data.note}
                                                               </span>
                                                            )}
                                                         </p>
                                                      </div>
                                                   </li>
                                                </div>
                                             );
                                          }
                                       )}
                                    </ul>
                                 </div>
                              );
                           }}
                        </DataTableDetail>
                     )}
                  </div>
               </div>
            </div>
            <div className="mt-[40px] min-w-[200px] w-full max-w-[400px] max-h-[230px]  overflow-y-auto dark:bg-container bg-white shadow-md px-[10px] pb-[10px]">
               <h1 className="ml-[10px] mt-[10px] font-[500] text-[24px] mb-[10px] dark:text-white text-[#474747]">
                  Items
               </h1>
               {detailPoData.items.map((item: any, index: number) => {
                  return (
                     <div
                        key={index}
                        className="p-[10px] hover:bg-[#2a47ca11] border-t-[1px]"
                     >
                        <div className="w-full ">
                           <div className="flex w-full justify-between items-center">
                              <p className="text-[#333333] dark:text-gray-50 text-[20px]">
                                 {item.name}{' '}
                                 <span
                                    className={`ml-[4px] text-[15px] ${
                                       item.status !== 'FINISH'
                                          ? 'text-[#b88c3b]'
                                          : 'text-[green]'
                                    }`}
                                 >
                                    ({item.status || 'Unprocess'})
                                 </span>
                              </p>
                              <Dialog>
                                 <DialogTrigger>
                                    <ArrowUpRightFromCircle className="w-[15px] h-[15px] cursor-pointer dark:text-white text-[#405189]" />
                                 </DialogTrigger>
                                 <DialogContent>
                                    <DialogHeader>
                                       <DialogTitle>
                                          <p className="text-[30px] text-[#525252] font-[500]">
                                             Timeline Items ({item.name})
                                          </p>
                                       </DialogTitle>
                                    </DialogHeader>
                                    <Timeline dataItems={item.itemProgress} />
                                 </DialogContent>
                              </Dialog>
                           </div>
                           <div className="flex mt-[2px] justify-between text-[14px] w-full">
                              <p className="dark:text-gray-200 text-[#626262] ">
                                 {item.type}{' '}
                                 <span className="ml-[2px]">
                                    ({item.variant})
                                 </span>
                              </p>
                              <p className="dark:text-white">
                                 Quantity : {item.qty}
                              </p>
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
