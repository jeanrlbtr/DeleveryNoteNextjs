import React from 'react';

const SmallTimeLine = ({ dataItems }: { dataItems: any }) => {
  return (
    <div className='py-4 min-w-[400px] max-w-[70vw] overflow-y-auto relative'>
      <div className='max-h-[60vh] flex '>
        <div className=' flex flex-col md:grid md:grid-cols-9 mx-auto p-2 '>
          <div className='flex flex-row-reverse md:contents'>
            <div className='w-full col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto border border-gray-300'>
              <h3 className='font-semibold text-xl mb-1 text-gray-900'>Title 1</h3>
              <p className='text-gray-600'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit blanditiis, dolore repellat dignissimos non sint architecto vel
                provident temporibus dolor cupiditate voluptatum ut doloribus nemo ipsa corporis ad. Earum, labore.
              </p>
            </div>

            <div className='col-start-5 col-end-6 md:mx-auto relative mr-10'>
              <div className='h-full w-6 flex items-center justify-center'>
                <div className='h-full w-0.5 bg-gray-200 pointer-events-none'></div>
              </div>

              <div className='w-6 h-6 absolute top-1/2 -mt-3 border-2 border-blue-500 rounded-full bg-gray-100 shadow'></div>
            </div>
            <div className='w-full col-start-6 col-end-10 flex items-center  '>
              <h3 className='font-[400] text-[16px] mb-1 text-gray-600'>29 November 2023</h3>
            </div>
          </div>

          <div className='flex md:contents'>
            <div className='w-full col-start-1 col-end-5 flex items-center  justify-end'>
              <h3 className='font-[400] text-[16px] mb-1 text-gray-600'>03 Desember 2023</h3>
            </div>
            <div className='col-start-5 col-end-6 mr-10 md:mx-auto relative'>
              <div className='h-full w-6 flex items-center justify-center'>
                <div className='h-full w-0.5 bg-gray-200 pointer-events-none'></div>
              </div>
              <div className='absolute top-1/2 -mt-3 '>
                <div className='w-6 h-6 border-2 border-blue-500 rounded-full bg-gray-100 shadow'></div>
              </div>
            </div>

            <div className='w-full col-start-6 col-end-10 my-4 mr-auto p-4 border border-gray-300 rounded-xl'>
              <h3 className='font-semibold text-xl mb-1 text-gray-900'>Title 2</h3>
              <p className='text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nesciunt maiores ipsa molestiae magnam libero dolorem explicabo.
                Nobis veniam incidunt at, alias ipsam est suscipit maxime sunt quia. Consectetur, aut.
              </p>
            </div>
          </div>

          <div className='flex flex-row-reverse md:contents'>
            <div className='w-full col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto border border-gray-300'>
              <h3 className='font-semibold text-xl mb-1 text-gray-900'>Title 3</h3>
              <p className='text-gray-600'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt ratione perspiciatis consectetur? Impedit inventore perferendis
                eligendi voluptatum facilis, consequatur provident facere ab quasi laudantium magni culpa porro tempora accusantium autem?
              </p>
            </div>

            <div className='col-start-5 col-end-6 md:mx-auto relative mr-10'>
              <div className='h-full w-6 flex items-center justify-center'>
                <div className='h-full w-0.5 bg-gray-200 pointer-events-none'></div>
              </div>

              <div className='w-6 h-6 absolute top-1/2 -mt-3 border-2 border-blue-500 rounded-full bg-gray-100 shadow'></div>
            </div>
            <div className='w-full col-start-6 col-end-10 flex items-center  '>
              <h3 className='font-[400] text-[16px] mb-1 text-gray-600'>12 Desember 2023</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallTimeLine;
