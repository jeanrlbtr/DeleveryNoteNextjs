import { DataTable } from '@/components/table/DataTabel';
import { rankColumn } from '@/components/table/columns';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileX2 } from 'lucide-react';
import { CircleEllipsis, FileCheck2 } from 'lucide-react';
import React from 'react';

const LoadingDashboard = () => {
  const arr = ['Loading', 'Loading', 'Loading', 'Loading'];
  return (
    <div>
      <div>
        <div className='flex justify-between gap-[20px]'>
          <div className='h-[80vh] flex flex-col gap-[12px]  overflow-y-auto rounded-[12px] bg-white w-[250px] px-3 py-2'>
            <p className='text-[20px] mb-[20px]'>Activity</p>
            <div className='relative w-max'>
              <div className='transform translate-x-1/2 translate-y-1/2 '>
                <div className='border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-24 w-24 absolute top-0 left-[33px]'></div>
              </div>
            </div>
          </div>
          <div className='flex flex-1 flex-col-reverse gap-[20px]'>
            <div className=' flex-1 w-full flex  bg-white rounded-[12px]  px-5 py-2'>
              <div className=' w-full flex-1 flex flex-col justify-between'>
                <p className='mb-[10px] text-[20px] text-[#525252]'>Total Purchase Order</p>
                <p>Loading Please Wait .....</p>
              </div>
            </div>
            <div className='bg-white rounded-[10px] px-[20px] py-[15px]'>
              <div className=' mb-[20px]  flex  justify-between items-center'>
                <Select defaultValue='year'>
                  <SelectTrigger className='w-[200px] bg-white'>
                    <SelectValue placeholder='Loading...' />
                  </SelectTrigger>
                </Select>
              </div>
              <div className='w-full flex gap-[15px]'>
                {arr.map((data: any, index: number) => {
                  return (
                    <div
                      className={`w-full p-2 flex flex-col items-center justify-center gap-[5px]   shadow-md h-[90px] rounded-[7px]  `}
                      key={index}
                    >
                      <p className={`w-max font-[600]  text-[#818181]`}>...</p>
                      <div className='flex gap-[10px] items-center w-max'>
                        {index == 1 && <CircleEllipsis className='text-[#6fa12c] w-[20px] h-[20px]' />}
                        {index == 2 && <FileCheck2 className='text-[#6fa12c] w-[20px] h-[20px]' />}
                        {index == 3 && <FileX2 className='text-[#e63e3e] w-[20px] h-[20px]' />}
                        <p className={`text-center text-[23px]  text-[#a3a3a3] `}>{data}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white px-4 rounded-[8px] py-3 mt-[20px]'>
          <>
            <div className='mt-[30px] flex justify-between items-center'>
              <p className='text-[26px] w-max text-[#525252]'>Most Ordered Product</p>
              <div className='flex items-center gap-[10px]'>
                <Select>
                  <SelectTrigger className='w-[150px]'>
                    <SelectValue placeholder='Limit Select' />
                  </SelectTrigger>
                </Select>
                <Select defaultValue='year'>
                  <SelectTrigger className='w-[150px]'>
                    <SelectValue placeholder='Date Filter' />
                  </SelectTrigger>
                </Select>
              </div>
            </div>
            <div className='px-5'>
              <DataTable
                data={[]}
                columns={rankColumn}
                isLoading={true}
                type={'dash'}
                disabledNext
                disabledPrev
              />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default LoadingDashboard;
