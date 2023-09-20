import TooltipComponent from '@/components/item/Tooltip/Tooltip';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import Image from 'next/image';

const menu = [
   {
      name: 'Loading',
      icon: <Loader className="w-[25px] h-[25px]" />,
      url: '/',
      access: '/',
      spaceY: false,
   },
   {
      name: 'Loading',
      icon: <Loader className="w-[25px] h-[25px]" />,
      url: '/notes',
      access: 'notes',
      spaceY: false,
   },
   {
      name: 'Loading',
      icon: <Loader className="w-[25px] h-[25px]" />,
      url: '/progress',
      access: 'progress',
      spaceY: false,
   },
   {
      name: 'Loading',
      icon: <Loader className="w-[25px] h-[25px]" />,
      url: '/item',
      access: 'item',
      spaceY: false,
   },
   {
      name: 'Loading',
      icon: <Loader className="w-[25px] h-[25px]" />,
      url: '/level',
      access: 'level',
      spaceY: true,
   },

   {
      name: 'Loading',
      icon: <Loader className="w-[25px] h-[25px]" />,
      url: '/users',
      access: 'users',
      spaceY: false,
   },
];

const Loading = () => {
   let show = false;
   return (
      <div className="flex relative h-screen w-screen">
         <div className="sticky hidden md:block top-0">
            <div
               className={`relative h-screen pb-[40px] ${
                  show ? 'px-6' : 'px-3'
               }  flex flex-col duration-300 pt-[20px] bg-[#252851] rounded-r-[10px]`}
            >
               <div
                  className={`absolute bg-[#232541]  top-[35px] right-[-10px]
            cursor-pointer shadow-2xl rounded-full`}
               >
                  {show ? (
                     <ChevronLeft className="text-white" />
                  ) : (
                     <ChevronRight className="text-white" />
                  )}
               </div>
               <div className="flex items-center gap-[10px]">
                  <div
                     className={`hidden duration-500 ${
                        show && 'rotate-[360deg]'
                     } md:flex rounded-[10px]  overflow-hidden w-[60px] h-[50px] relative `}
                  >
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
                  <p className={`text-white ${!show && 'hidden'}`}>
                     Delevery note
                  </p>
               </div>
               <div className={`flex flex-col gap-[7px] mt-14  w-max mx-auto`}>
                  {menu.map((item, index) => {
                     return (
                        <div key={index}>
                           <div
                              className={`cursor-pointer flex gap-[10px] rounded-md   p-2 items-center active:text-red-600  hover:text-[#fff]  ${
                                 item.spaceY && 'mt-[30px]'
                              }`}
                           >
                              <TooltipComponent title={item.name}>
                                 <div className="flex gap-[10px] text-white items-center">
                                    {item.icon}
                                    <p
                                       className={`capitalize duration-300 ease-in-out ${
                                          !show && 'hidden'
                                       }`}
                                    >
                                       {item.name}
                                    </p>
                                 </div>
                              </TooltipComponent>
                           </div>
                        </div>
                     );
                  })}

                  <div
                     className={`cursor-pointer flex p-2 gap-[10px] mt-[30px] active:text-red-600 items-center  hover:text-[#fff] text-[#e9e9e9]`}
                  >
                     <TooltipComponent title="Logout">
                        <div className="flex gap-[10px] items-center">
                           <Loader className="w-[25px] h-[25px]" />
                           <p
                              className={`capitalize duration-300 ease-in-out ${
                                 !show && 'scale-0 hidden'
                              }`}
                           >
                              logout
                           </p>
                        </div>
                     </TooltipComponent>
                  </div>
               </div>
            </div>
         </div>

         <div className="flex items-center justify-center h-screen w-full space-x-2">
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
         </div>
      </div>
   );
};

export default Loading;
