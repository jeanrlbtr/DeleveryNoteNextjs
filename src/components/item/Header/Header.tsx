'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '../Sidebar/Sidebar';

import { TextAlignLeftIcon } from '@radix-ui/react-icons';

const Header = ({ title, name }: { title: string; name: string }) => {
   return (
      <div className="max-w-screen bg-[#405189] flex justify-between md:px-8 px-4 pt-4 pb-3 shadow">
         <div className="flex items-center md:gap-[25px] gap-[15px]">
            <Sheet>
               <SheetTrigger>
                  <TextAlignLeftIcon className="text-[#fafafa] w-[25px] h-[25px] cursor-pointer md:w-[30px] md:h-[30px]" />
               </SheetTrigger>
               <SheetContent
                  color="white"
                  className="bg-[#405189] border-none w-[250px]"
                  side={'left'}
               >
                  <Sidebar name={name} />
               </SheetContent>
            </Sheet>
            <p className="text-[17px] md:text-[25px] font-[600] text-[#fff]">
               {title}
            </p>
         </div>
         <div className="flex gap-3 md:gap-7 items-center ">
            <p className="capitalize text-[16px] md:text-[24px] font-Poppins text-[#fafafa]">
               {name}
            </p>
            {/* <div className='relative'>
          <Popover>
            <PopoverTrigger>
              <BellIcon className='md:w-[25px] md:h-[25px] h-[20px] w-[20px] text-[#fafafa]' />
              <div className='rounded-[50%] md:h-5 md:w-5 h-3 w-3 flex items-center justify-center bg-[red] absolute text-[white] md:top-[-7px] top-[-5px] right-[-4px] md:right-[-9px]  md:text-[17px] text-[12px]'>
                1
              </div>
            </PopoverTrigger>
            <PopoverContent className='w-[350px]'>
              <div className='flex justify-between items-center bg-[#eee] px-2 rounded-[7px] '>
                <div className='flex items-center'>
                  <p className='text-[#525252]'>1.</p>
                  <p className='text-[#525252] ml-[5px]'>Surat jalan Baru dari Mattew</p>
                </div>
                <TrashIcon color='red' />
              </div>
            </PopoverContent>
          </Popover>
        </div> */}
         </div>
      </div>
   );
};

export default Header;
