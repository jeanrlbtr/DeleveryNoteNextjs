'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '../Sidebar/Sidebar';

import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover';
import { TextAlignLeftIcon } from '@radix-ui/react-icons';
import { BellIcon, TrashIcon } from 'lucide-react';
import Image from 'next/image';

const Header = ({ title, name }: { title: string; name: string }) => {
   return (
      <div className="max-w-screen bg-[#5c6eaa] flex justify-between md:px-8 px-4 h-[69px] shadow">
         <div className="flex items-center md:gap-[25px] gap-[15px]">
            <div className="hidden md:flex rounded-[10px] overflow-hidden w-[60px] relative h-[50px]">
               <Image
                  src={
                     'https://lcdn-hk.icons8.com/c/jVbwZTa3jEi0TUcD6h2Z1g/bacbacbac9625519aa00347de9a41138e7f3b035.png'
                  }
                  alt="Delevery note"
                  fill
                  className="cover"
                  quality={100}
               />
            </div>

            <div className="md:hidden flex gap-2">
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
         </div>
         <div className="flex gap-3 md:gap-5 items-center ">
            <div className="relative">
               <Popover>
                  <PopoverTrigger>
                     <BellIcon className="md:w-[23px] md:h-[23px] h-[20px] w-[20px] text-[#fafafa]" />
                     <div className="rounded-[50%] md:h-5 md:w-5 h-3 w-3 flex items-center justify-center bg-[red] absolute text-[white] md:top-[-7px] top-[-5px] right-[-4px] md:right-[-9px]  md:text-[17px] text-[12px]">
                        0
                     </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[350px]">
                     <div className="flex justify-between items-center bg-[#eee] px-2 rounded-[7px] ">
                        <div className="flex items-center">
                           <p className="text-[#525252] ml-[5px]">
                              no notification found
                           </p>
                        </div>
                        <TrashIcon className="w-[20px] h-[20px]" color="red" />
                     </div>
                  </PopoverContent>
               </Popover>
            </div>
            <p className="capitalize text-[16px] md:text-[24px] font-Poppins text-[#fafafa]">
               {name}
            </p>
         </div>
      </div>
   );
};

export default Header;
