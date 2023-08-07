'use client';

import { Chart } from '@/components/item';
import { DataTable } from '@/components/table/DataTabel';
import { rankColumn } from '@/components/table/columns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ClientFetching from '@/hooks/clientFetching';
import { useQuery } from '@tanstack/react-query';
import { Clock3, FileCheck2, FileX, FileX2 } from 'lucide-react';
import React from 'react';
import LoadingDashboard from './LoadingDashboard';
import { CircleEllipsis } from 'lucide-react';

const Dashboard = () => {
  const [dateRanked, setDateRanked] = React.useState<string>('year');
  const [limit, setLimit] = React.useState<number>(5);
  const [statusDate, setStatusDate] = React.useState<string>('year');

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

  const axiosFetching = ClientFetching();

  // const { data: dataStatus, isLoading: isLoadingStatus } = useQuery({
  //   queryKey: ['getStatus', statusDate],
  //   queryFn: async () => {
  //     const res = await axiosFetching.get(`'/delivery/v1/data/ui?chart[][data]=status&chart[][time]=${statusDate}`);
  //     return res.data.data;
  //   },
  // });

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['getDashboard'],
    queryFn: async () => {
      const res = await axiosFetching.get(
        '/delivery/v1/data/ui?chart[][data]=status&chart[][time]=year&chart[1][data]=activity&chart[2][data]=total&chart[3][data]=rank&chart[3][limit]=10&chart[3][time]=year'
      );
      return res.data.data;
    },
  });

  const { data: dataRankedItem, isLoading: isLoadingRanked } = useQuery({
    queryKey: ['getDataRanked', dateRanked, limit],
    queryFn: async () => {
      const res = await axiosFetching.get(`/delivery/v1/data/ui?chart[3][data]=rank&chart[3][limit]=${limit}&chart[3][time]=${dateRanked}`);
      return res.data.data;
    },
  });

  const statusData = [
    {
      status: dashboardData?.status.total,
      name: 'Total',
    },
    { status: dashboardData?.status.process, name: 'Process' },
    { status: dashboardData?.status.finish, name: 'Finish' },
    { status: dashboardData?.status.canceled, name: 'Canceled' },
  ];
  return (
    <>
      {!isLoading ? (
        <div>
          <div className='flex justify-between gap-[20px]'>
            <div className='h-[80vh] flex flex-col gap-[12px]  overflow-y-auto rounded-[12px] bg-white w-[250px] px-3 py-2'>
              <p className='text-[20px] mb-[20px]'>Activity</p>
              {dashboardData?.activity.length > 0 ? (
                dashboardData?.activity.map((activity: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className='flex  gap-[10px]'
                    >
                      <div className='flex flex-col gap-[5px] items-center'>
                        <div className='bg-[#5C469C] w-[30px] h-[30px] rounded-full flex justify-center items-center'>
                          <p className='text-white'>AD</p>
                        </div>
                        <div className='h-[10px] w-[5px] bg-[#5C469C] rounded-full'></div>
                        <div className='h-[7px] w-[5px] bg-[#5C469C] rounded-full'></div>
                        <div className='h-[5px] w-[5px] bg-[#5C469C] rounded-full'></div>
                        <div className='h-[3px] w-[3px] bg-[#5C469C] rounded-full'></div>
                      </div>
                      <div>
                        <div className='text-[#525252] items-center w-full flex mb-[5px] justify-between'>
                          <p className='text-[#666666]'>{activity.user.name}</p>
                          <div className='flex items-center gap-[6px]'>
                            <Clock3 className='w-[10px] h-[10px] cursor-pointer text-[#405189]' />
                            <p className='text-[11px]'>{activity.fromTimestamp}</p>
                          </div>
                        </div>
                        <p className='text-[#7c7c7c] text-[13px]'>{activity.message}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className='w-full flex justify-center lg:h-[300px] items-center'>
                  <p className='capitalize text-[#525252] text-[15px]'>no data activity</p>
                </div>
              )}
            </div>
            <div className='flex flex-1 flex-col-reverse gap-[20px]'>
              <div className=' flex-1 w-full flex  bg-white rounded-[12px]  px-5 py-2'>
                <div className=' w-full flex-1 flex flex-col justify-between'>
                  <p className='mb-[10px] text-[20px] text-[#525252]'>Total Purchase Order</p>
                  <Chart dataTotal={dashboardData?.total || false} />
                </div>
              </div>
              <div className='bg-white rounded-[10px] px-[20px] py-[15px]'>
                <div className=' mb-[20px]  flex  justify-between items-center'>
                  <Select
                    defaultValue='year'
                    onValueChange={(e: string) => setStatusDate(e)}
                  >
                    <SelectTrigger className='w-[200px] bg-white'>
                      <SelectValue placeholder='Date Filter' />
                    </SelectTrigger>
                    <SelectContent>
                      {dateRank.map((date: any, index: number) => {
                        return (
                          <SelectItem
                            key={index}
                            value={`${date.key}`}
                          >
                            {date.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className='w-full flex gap-[15px]'>
                  {statusData.map((data: any, index: number) => {
                    return (
                      <div
                        className={`w-full p-2 flex flex-col items-center justify-center gap-[5px]   shadow-md h-[90px] rounded-[7px]  `}
                        key={index}
                      >
                        <p className={`w-max font-[600]  text-[#818181]`}>{data.status}</p>
                        <div className='flex gap-[10px] items-center w-max'>
                          {index == 1 && <CircleEllipsis className='text-[#6fa12c] w-[20px] h-[20px]' />}
                          {index == 2 && <FileCheck2 className='text-[#6fa12c] w-[20px] h-[20px]' />}
                          {index == 3 && <FileX2 className='text-[#e63e3e] w-[20px] h-[20px]' />}
                          <p className={`text-center text-[23px]  text-[#a3a3a3] `}>{data.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white px-4 rounded-[8px] py-3 mt-[20px]'>
            {!isLoading && (
              <>
                <div className='mt-[20px] px-[28px] flex justify-between items-center'>
                  <p className='text-[26px] w-max text-[#525252]'>Most Ordered Product</p>
                  <div className='flex items-center gap-[10px]'>
                    <Select
                      onValueChange={(e) => {
                        const limit = parseInt(e);
                        setLimit(limit);
                      }}
                    >
                      <SelectTrigger className='w-[150px]'>
                        <SelectValue placeholder='Limit Select' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='10'>10</SelectItem>
                        <SelectItem value='20'>20</SelectItem>
                        <SelectItem value='30'>30</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      defaultValue='year'
                      onValueChange={(e: string) => setDateRanked(e)}
                    >
                      <SelectTrigger className='w-[150px]'>
                        <SelectValue placeholder='Date Filter' />
                      </SelectTrigger>
                      <SelectContent>
                        {dateRank.map((date: any, index: number) => {
                          return (
                            <SelectItem
                              key={index}
                              value={`${date.key}`}
                            >
                              {date.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='px-5 mt-[30px]'>
                  <DataTable
                    data={dataRankedItem?.rank || false}
                    columns={rankColumn}
                    isLoading={isLoadingRanked}
                    type={'dash'}
                    disabledNext
                    disabledPrev
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <LoadingDashboard />
      )}
    </>
  );
};

export default Dashboard;
