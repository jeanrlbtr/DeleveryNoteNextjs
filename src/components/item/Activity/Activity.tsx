import { Clock3 } from 'lucide-react';

interface Props {
   name: string;
   timeStamp: number;
   message: string;
}

const ActivityItem = ({ name, timeStamp, message }: Props) => {
   return (
      <div className="flex  gap-[10px]">
         <div className="flex flex-col gap-[5px] items-center">
            <div className="bg-[#5C469C] w-[30px] h-[30px] rounded-full flex justify-center items-center">
               <p className="text-white">AD</p>
            </div>
            <div className="h-[10px] w-[5px] bg-[#5C469C] rounded-full"></div>
            <div className="h-[7px] w-[5px] bg-[#5C469C] rounded-full"></div>
            <div className="h-[5px] w-[5px] bg-[#5C469C] rounded-full"></div>
            <div className="h-[3px] w-[3px] bg-[#5C469C] rounded-full"></div>
         </div>
         <div>
            <div className=" items-center w-full flex mb-[5px] justify-between">
               <p className="">{name}</p>
               <div className="flex items-center gap-[6px]">
                  <Clock3 className="w-[10px] h-[10px] cursor-pointer text-[#fff]" />
                  <p className="text-[11px]">{timeStamp}</p>
               </div>
            </div>
            <p className="dark:text-[#f0f0f0] text-[13px]">{message}</p>
         </div>
      </div>
   );
};

export default ActivityItem;
