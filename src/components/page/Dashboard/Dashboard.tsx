'use client';

import { Chart } from '@/components/item';
import ActivityItem from '@/components/item/Activity/Activity';
import { DataTable } from '@/components/table/DataTabel';
import { rankColumn } from '@/components/table/columns';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { UseQueryFetching } from '@/hooks/UseQueryFetch';
import {
   ActivityT,
   DashboardType,
   RankType,
   Status,
   StatusType,
} from '@/types';
import { CircleEllipsis, FileCheck2, FileX2 } from 'lucide-react';
import React from 'react';

const Dashboard = ({ data }: { data: DashboardType }) => {
   const [dasboard] = React.useState<DashboardType>(data);
   const dashboardData = dasboard;
   const [dateRanked, setDateRanked] = React.useState<string>('year');
   const [limit, setLimit] = React.useState<number>(5);
   const [statusDate, setStatusDate] = React.useState<string>('year');
   const [statusData, setStatusData] = React.useState<StatusType[]>([
      { status: dashboardData?.status.total, name: 'Total', color: '' },
      { status: dashboardData?.status.inprogress, name: 'Process', color: '' },
      { status: dashboardData?.status.finish, name: 'Finish', color: '' },
      { status: dashboardData?.status.canceled, name: 'Canceled', color: '' },
   ]);
   const dateRank = [
      {
         name: 'Today',
         key: 'today',
      },
      {
         name: 'Year',
         key: 'year',
      },
      {
         name: 'Last Week',
         key: 'lweek',
      },
      {
         name: 'Month',
         key: 'month',
      },
      {
         name: 'Last Month',
         key: 'lmonth',
      },
   ];

   const { data: dataStatus } = UseQueryFetching<Status>(
      `/delivery/v1/data/ui?chart[][data]=status&chart[][time]=${statusDate}`,
      ['getStatus', statusDate],
      { status: dashboardData?.status }
   );

   const { data: dataRankedItem, isLoading: isLoadingRanked } =
      UseQueryFetching<RankType>(
         `/delivery/v1/data/ui?chart[3][data]=rank&chart[3][limit]=${limit}&chart[3][time]=${dateRanked}`,
         ['getDataRanked', dateRanked, limit],
         {
            rank: dashboardData.rank,
         }
      );

   React.useEffect(() => {
      if (dataStatus) {
         setStatusData([
            { status: dataStatus.status.total, name: 'Total' },
            { status: dataStatus.status.inprogress, name: 'Process' },
            { status: dataStatus.status.finish, name: 'Finish' },
            { status: dataStatus.status.canceled, name: 'Canceled' },
         ]);
      }
   }, [dataStatus]);

   return (
      <div className="">
         <div className="grid grid-cols-4 md:grid-rows-1 grid-rows-2 justify-between gap-[20px]">
            <div className="activity dark:text-white col-span-4 row-start-2 md:row-start-1 h-[400px] overflow-hidden  md:col-span-1 flex flex-col gap-[12px] md:h-[600px]  overflow-y-auto rounded-[12px] bg-white dark:bg-container px-3 py-2">
               <p className="text-[20px] mb-[20px]">Activity</p>
               {dashboardData?.activity.length > 0 ? (
                  dashboardData?.activity.map(
                     (activity: ActivityT, index: number) => {
                        return (
                           <ActivityItem
                              key={index}
                              name={activity.user.name}
                              message={activity.message}
                              timeStamp={activity.fromTimestamp}
                           />
                        );
                     }
                  )
               ) : (
                  <div className="w-full flex justify-center lg:h-[300px] items-center">
                     <p className="capitalize text-[15px]">no activity</p>
                  </div>
               )}
            </div>
            <div className="col-span-4 row-span-1  md:col-span-3 flex flex-1 flex-col-reverse gap-[20px]">
               <div className=" flex-1 w-full flex bg-white dark:bg-container rounded-[12px]  px-5 py-2">
                  <div className=" w-full flex-1 flex flex-col justify-between">
                     <p className="mb-[10px] text-gray-800 dark:text-white text-[20px] ">
                        Total Purchase Order
                     </p>
                     <Chart dataTotal={dashboardData?.total || false} />
                  </div>
               </div>
               <div className="dark:bg-container bg-white rounded-[10px] px-[20px] py-[15px]">
                  <div className=" mb-[20px] flex justify-between items-center">
                     <Select
                        defaultValue="year"
                        onValueChange={(e: string) => setStatusDate(e)}
                     >
                        <SelectTrigger className="w-[200px] bg-transparent border-[1px] dark:border-gray-50 dark:text-white">
                           <SelectValue placeholder="Date Filter" />
                        </SelectTrigger>
                        <SelectContent>
                           {dateRank.map((date: any, index: number) => {
                              return (
                                 <SelectItem key={index} value={`${date.key}`}>
                                    {date.name}
                                 </SelectItem>
                              );
                           })}
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="max-w-full flex gap-[15px] overflow-x-auto py-[10px] px-[10px]">
                     {statusData.map((data: any, index: number) => {
                        return (
                           <div
                              className={`w-full p-2 flex flex-col items-center justify-center gap-[5px]  shadow-md h-[90px] rounded-[7px]  `}
                              key={index}
                           >
                              <p
                                 className={`w-max font-[600] text-gray-600 dark:text-[#fff]`}
                              >
                                 {data.status}
                              </p>
                              <div className="flex gap-[10px] items-center w-max">
                                 {index == 1 && (
                                    <CircleEllipsis className="text-[#d8cf56] w-[20px] h-[20px]" />
                                 )}
                                 {index == 2 && (
                                    <FileCheck2 className="text-[#6fa12c] w-[20px] h-[20px]" />
                                 )}
                                 {index == 3 && (
                                    <FileX2 className="text-[#e63e3e] w-[20px] h-[20px]" />
                                 )}
                                 <p
                                    className={`text-center text-[23px] text-gray-500 dark:text-[#f0f0f0] `}
                                 >
                                    {data.name}
                                 </p>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>
         </div>
         <div className="dark:bg-container bg-white px-1 md:px-4 rounded-[8px] py-1 md:py-3 mt-[20px]">
            <>
               <div className="mt-[20px] px-[7px] md:px-[28px] md:flex justify-between items-center">
                  <p className="md:text-[20px] w-max text-gray-800 dark:text-[#fff]">
                     Most Ordered Product
                  </p>
                  <div className="flex mt-[20px] md:mt-0 items-center gap-[10px]">
                     <Select
                        defaultValue="10"
                        onValueChange={(e) => {
                           const limit = parseInt(e);
                           setLimit(limit);
                        }}
                     >
                        <SelectTrigger className="md:w-[150px] w-max p-0 border-[1px] border-gray-300 dark:text-white md:text-[16px] text-[12px] px-[5px]">
                           <SelectValue placeholder="Limit" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="10">10</SelectItem>
                           <SelectItem value="20">20</SelectItem>
                           <SelectItem value="30">30</SelectItem>
                        </SelectContent>
                     </Select>
                     <Select
                        defaultValue="year"
                        onValueChange={(e: string) => setDateRanked(e)}
                     >
                        <SelectTrigger className="md:w-[150px] w-max p-0 border-gray-300 border-[1px] dark:text-white md:text-[16px] text-[12px] px-[5px]">
                           <SelectValue placeholder="Date Filter" />
                        </SelectTrigger>
                        <SelectContent>
                           {dateRank.map((date: any, index: number) => {
                              return (
                                 <SelectItem key={index} value={`${date.key}`}>
                                    {date.name}
                                 </SelectItem>
                              );
                           })}
                        </SelectContent>
                     </Select>
                  </div>
               </div>
               <div className="px-[7px] md:px-5 md:mt-[30px] mt-[10px]">
                  <DataTable
                     data={dataRankedItem?.rank || []}
                     columns={rankColumn}
                     isLoading={isLoadingRanked}
                     type={'dash'}
                     disabledNext
                     disabledPrev
                  />
               </div>
            </>
         </div>
      </div>
   );
};

export default Dashboard;
