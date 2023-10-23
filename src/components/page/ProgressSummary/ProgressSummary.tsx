'use client';

import { ProgressSummaryT } from '@/types';

const ProgressSummary = ({ allItem }: { allItem: ProgressSummaryT }) => {
   const statusAllItem = allItem.data;
   return (
      <div className="">
         <div className="flex justify-end gap-4 mb-5 w-full items-center"></div>
         <div className="bg-white w-full min-w-[100%]  rounded-[7px] min-h-[73vh] overflow-auto">
            <div className="grid grid-cols-5 w-full gap-5">
               {statusAllItem.map((item, index) => {
                  return (
                     <div
                        key={index}
                        className="relative rounded-md col-span-1 bg-gray-100 px-2 py-2 pb-3"
                     >
                        <div className="flex justify-between items-center mb-[20px]">
                           <div className="flex items-center gap-[8px]">
                              <div className="h-[10px] w-[10px] rounded-full bg-blue-700" />
                              <p className="sticky rounded-sm top-0 text-[15px] text-gray-900 font-medium">
                                 {item.name}
                                 <span className="bg-white rounded-lg ml-1 text-gray-700 px-2">
                                    {item.items.length}
                                 </span>
                              </p>
                           </div>
                           {/* {title === 'Finish' && (
                              <div className="flex items-center gap-3">
                                 <ChevronLeft className="w-4 h-4 cursor-pointer" />
                                 <ChevronRight className="w-4 h-4 cursor-pointer" />
                              </div>
                           )} */}
                        </div>
                        {item.items.map((itemDetail, index: number) => {
                           const dateNote = new Date(
                              itemDetail.inv.dateNote
                           ).toLocaleDateString();
                           const dateDelevery = new Date(
                              itemDetail.inv.dateDelivery
                           ).toLocaleDateString();
                           return (
                              <div
                                 key={index}
                                 className=" mt-[10px] rounded-[5px] px-2 py-[10px] bg-white shadow-lg min-h-[200px]"
                              >
                                 <div className="flex flex-col gap-1">
                                    <p className="text-[11px] font-medium bg-blue-200 px-2 w-max rounded-lg text-gray-600">
                                       {itemDetail.no}
                                    </p>
                                    <p className="text-[14px] uppercase dark:text-gray-700 font-semibold ">
                                       {itemDetail.name}{' '}
                                       <span className="ml-1">
                                          {' '}
                                          ({itemDetail.qty})
                                       </span>
                                    </p>
                                 </div>
                                 <div className="text-[15px] font-normal text-gray-900 mt-2 flex flex-col gap-2">
                                    <div>
                                       <p className="text-[12px] text-gray-700 font-normal">
                                          Customer:
                                       </p>
                                       <p>{itemDetail.inv.recipientName}</p>
                                    </div>
                                    <div>
                                       <p className="text-[12px] text-gray-700 font-normal">
                                          Penangung Jawab:
                                       </p>
                                       <p>{itemDetail.inv.store}</p>
                                    </div>
                                 </div>
                                 <div className="h-[1px] mt-[7px]  w-full bg-gray-300" />
                                 <div className="flex justify-between dark:text-gray-700 items-center">
                                    <div>
                                       <p className="text-[12px] capitalize">
                                          Tanggal Pengiriman :
                                       </p>
                                       <p className="text-sm font-medium">
                                          {dateNote}
                                       </p>
                                    </div>
                                    <div>
                                       <p className="text-[12px] capitalize">
                                          Tanggal SJ :
                                       </p>
                                       <p className="text-sm font-medium">
                                          {dateDelevery}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default ProgressSummary;
