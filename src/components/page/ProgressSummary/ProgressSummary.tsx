'use client';

import { ChevronDown, MoreVertical } from 'lucide-react';

const status = [
   'Process',
   'Preparing Material',
   'In Production',
   'Final Packing',
   'Finish',
];

const ProgressSummary = () => {
   return (
      <div className="">
         <div className="flex justify-end gap-4 mb-4 w-full items-center">
            <div className="flex gap-2 items-center ">
               <p className="text-[14px] font-[500]">Current</p>
               <div className="bg-transparent border-[1px] border-gray-300 px-1 py-[3px] rounded-md h-max flex text-gray-700  gap-2 items-center text-sm">
                  Page 1
                  <ChevronDown className="w-[15px] h-[15px]" />
               </div>
            </div>
            <div className="flex gap-2 items-center">
               <p className="text-[14px] font-[500]">Show</p>
               <div className="flex gap-1 bg-transparent border-[1px] border-gray-300 px-2 py-[3px] text-gray-700 rounded-md items-center text-sm">
                  <p>10</p>
                  <ChevronDown className="w-[15px] h-[15px]" />
               </div>
            </div>
         </div>
         <div className="bg-white w-full min-w-[100%]  rounded-[7px] min-h-[73vh] overflow-auto">
            <div className="grid grid-cols-5 w-full gap-5">
               {status.map((title, index) => {
                  return (
                     <div
                        key={index}
                        className="relative rounded-md col-span-1 bg-gray-100 px-2 py-2 pb-3"
                     >
                        <div className="flex justify-between items-center mb-[20px]">
                           <div className="flex items-center gap-[8px]">
                              <div className="h-[10px] w-[10px] rounded-full bg-blue-700" />
                              <p className="sticky rounded-sm top-0 text-[15px] text-gray-900 font-medium">
                                 {title}{' '}
                                 <span className="bg-white rounded-lg text-gray-700 px-2">
                                    4
                                 </span>
                              </p>
                           </div>
                           <div>
                              <MoreVertical className="w-4 h-4" />
                           </div>
                        </div>
                        <div className=" mt-[10px] rounded-[5px] px-2 py-[10px] bg-white shadow-lg min-h-[200px]">
                           <div className="flex flex-col gap-1">
                              <p className="text-[11px] font-medium bg-blue-200 px-2 w-max rounded-lg text-gray-600">
                                 GFB/SJ/2023/05/01
                              </p>
                              <p className="text-[14px] uppercase font-semibold ">
                                 kursi Vettor (10)
                              </p>
                           </div>
                           <div className="text-[15px] font-normal text-gray-900 mt-2 flex flex-col gap-2">
                              <div>
                                 <p className="text-[12px] text-gray-700 font-normal">
                                    Customer:
                                 </p>
                                 <p>Gudang Furniture</p>
                              </div>
                              <div>
                                 <p className="text-[12px] text-gray-700 font-normal">
                                    Update By:
                                 </p>
                                 <p>Henri Setia</p>
                              </div>
                           </div>
                           <div className="h-[1px] mt-[7px] w-full bg-gray-300" />
                           <div className="flex justify-between items-center">
                              <div>
                                 <p className="text-[12px] capitalize">
                                    date Shipment :
                                 </p>
                                 <p className="text-sm font-medium">
                                    27-08-2023
                                 </p>
                              </div>
                              <div>
                                 <p className="text-[12px] capitalize">
                                    date Order :
                                 </p>
                                 <p className="text-sm font-medium">
                                    27-08-2023
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div className=" mt-[10px] rounded-[5px] px-2 py-[10px] bg-white shadow-lg min-h-[200px]">
                           <div className="flex flex-col gap-1">
                              <p className="text-[11px] font-medium bg-blue-200 px-2 w-max rounded-lg text-gray-600">
                                 GFB/SJ/2023/05/01
                              </p>
                              <p className="text-[14px] uppercase font-semibold">
                                 kursi Vettor (10)
                              </p>
                           </div>
                           <div className="text-[15px] font-normal text-gray-900 mt-2 flex flex-col gap-2">
                              <div>
                                 <p className="text-[12px] text-gray-700 font-normal">
                                    Customer:
                                 </p>
                                 <p>Gudang Furniture</p>
                              </div>
                              <div>
                                 <p className="text-[12px] text-gray-700 font-normal">
                                    Update By:
                                 </p>
                                 <p>Henri Setia</p>
                              </div>
                           </div>
                           <div className="h-[1px] mt-[7px] w-full bg-gray-300" />
                           <div className="flex justify-between items-center">
                              <div>
                                 <p className="text-[12px] capitalize">
                                    date Shipment :
                                 </p>
                                 <p className="text-sm font-medium">
                                    27-08-2023
                                 </p>
                              </div>
                              <div>
                                 <p className="text-[12px] capitalize">
                                    date Order :
                                 </p>
                                 <p className="text-sm font-medium">
                                    27-08-2023
                                 </p>
                              </div>
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

export default ProgressSummary;
