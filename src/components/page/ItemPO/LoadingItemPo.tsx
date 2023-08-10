import React from 'react';

const LoadingItemPo = () => {
  return (
    <div>
      <div className='w-full h-max p-2 rounded-[5px] bg-[#fefefe] mt-[30px]'>
        <div className={`flex justify-between items-center `}>
          <p className='text-[18px] text-[#525252] font-[500]'>Loading ...</p>
        </div>

        <div className={`p-[10px] mt-[10px] hover:bg-[#2a47ca11] border-t-[1px]`}>
          <div className='w-full '>
            <div className='flex w-full justify-between items-center'>
              <p className='text-[#333333] text-[20px]'>
                Loading ...
                <span className={`ml-[4px] text-[15px]`}>...</span>
              </p>
              <div className='flex items-center flex-row-reverse gap-[12px]'>...</div>
            </div>
            <div className='flex mt-[2px]  justify-between text-[14px] w-full'>
              <p className='text-[#626262]'>waiting...</p>
              <p className='text-black'>Quantity : -</p>
            </div>
          </div>
          <div className='flex justify-end mt-[6px]'>
            <div className={`text-[14px] bg-[#1d3f72] text-white px-2 py-1 rounded-[5px]`}>Please Wait ...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingItemPo;
