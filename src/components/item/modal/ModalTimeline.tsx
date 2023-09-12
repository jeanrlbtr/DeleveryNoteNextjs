import { ItemProgressT } from '@/types';

const Timeline = ({ dataItems }: { dataItems: ItemProgressT[] }) => {
   return (
      <div className="py-4 md:min-w-[400px] md:w-[60vw] w-[300px] rounded-[10px] max-w-[70vw] overflow-y-auto relative">
         <div className="max-h-[60vh] flex ">
            <div className=" flex flex-col md:grid md:grid-cols-9 mx-auto p-2 ">
               {dataItems.map((progress: ItemProgressT, index: number) => {
                  const date = new Date(
                     progress.timestamp * 1000
                  ).toDateString();
                  const time = new Date(
                     progress.timestamp * 1000
                  ).toLocaleTimeString();
                  const indexPlus1 = index + 1;
                  return (
                     <div
                        key={index}
                        className="flex flex-row-reverse md:contents"
                     >
                        {indexPlus1 % 2 != 0 ? (
                           <>
                              <div
                                 className={`w-full col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto border border-gray-300`}
                              >
                                 <h3
                                    className={`font-semibold ${
                                       progress.status.name === 'FINISH'
                                          ? 'text-[green]'
                                          : 'text-[#ff9100]'
                                    } text-[14px] md:text-[17px] mb-1 `}
                                 >
                                    {progress.status.name}{' '}
                                    <span>({progress.user.name})</span>
                                 </h3>
                                 <p className="text-gray-600 w-[300px] text-[12px] md:text-[17px]">
                                    {progress.note}
                                 </p>
                              </div>
                              <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
                                 <div className="h-full w-6 flex items-center justify-center">
                                    <div className="h-full w-0.5 bg-gray-200 pointer-events-none"></div>
                                 </div>

                                 <div className="w-6 h-6 absolute top-1/2 -mt-3 border-2 border-blue-500 rounded-full bg-gray-100 shadow"></div>
                              </div>
                              <div className="w-full col-start-6 col-end-10 flex items-center  ">
                                 <h3 className="font-[400] text-[12px] md:text-[16px] mb-1 text-gray-600">
                                    {date}, {time}
                                 </h3>
                              </div>
                           </>
                        ) : (
                           <>
                              <div className="w-full col-start-1 col-end-5 flex items-center  justify-end">
                                 <h3 className="font-[400] text-[12px] md:text-[16px] mb-1 text-gray-600">
                                    {date}, {time}
                                 </h3>
                              </div>
                              <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                                 <div className="h-full w-6 flex items-center justify-center">
                                    <div className="h-full w-0.5 bg-gray-200 pointer-events-none"></div>
                                 </div>
                                 <div className="absolute top-1/2 -mt-3 ">
                                    <div className="w-6 h-6 border-2 border-blue-500 rounded-full bg-gray-100 shadow"></div>
                                 </div>
                              </div>

                              <div className="w-full col-start-6 col-end-10 my-4 mr-auto p-4 border border-gray-300 rounded-xl">
                                 <h3
                                    className={`font-semibold ${
                                       progress.status.name === 'FINISH'
                                          ? 'text-[green]'
                                          : 'text-[#ff9100]'
                                    } text-[14px] md:text-[17px] mb-1 `}
                                 >
                                    {progress.status.name}{' '}
                                    <span>({progress.user.name})</span>
                                 </h3>
                                 <p className="text-gray-600 w-[300px] text-[12px] md:text-[17px]">
                                    {progress.note}
                                 </p>
                              </div>
                           </>
                        )}
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default Timeline;
