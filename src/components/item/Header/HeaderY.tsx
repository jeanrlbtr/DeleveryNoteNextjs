'use client';

import { deleteCookie, getCookie } from 'cookies-next';
import {
   ChevronLeft,
   ChevronRight,
   FileStack,
   LayoutPanelLeft,
   LogOut,
   PackageCheck,
   TruckIcon,
   User,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import TooltipComponent from '../Tooltip/Tooltip';

interface HeaderYProps {
   handleSidebar: () => void;
   show: boolean;
}

const menu = [
   {
      name: 'Dashboard',
      icon: <LayoutPanelLeft className="w-[25px] h-[25px]" />,
      url: '/',
      access: '/',
      spaceY: false,
   },
   {
      name: 'Purchase Order',
      icon: <TruckIcon className="w-[25px] h-[25px]" />,
      url: '/notes',
      access: 'notes',
      spaceY: false,
   },
   {
      name: 'Check Item',
      icon: <PackageCheck className="w-[25px] h-[25px]" />,
      url: '/item',
      access: 'item',
      spaceY: false,
   },
   {
      name: 'Level',
      icon: <FileStack className="w-[25px] h-[25px]" />,
      url: '/level',
      access: 'level',
      spaceY: true,
   },
   {
      name: 'Users',
      icon: <User className="w-[25px] h-[25px]" />,
      url: '/users',
      access: 'users',
      spaceY: false,
   },
];

const HeaderY = ({ handleSidebar, show }: HeaderYProps) => {
   const route = useRouter();
   const data: string = getCookie('data')?.toString() || '';
   const navigate = (url?: any) => {
      route.push(url);
   };
   const logout = async () => {
      try {
         deleteCookie('access_token', { path: '/', domain: '.saptakarsa.com' });
         deleteCookie('refresh_token', {
            path: '/',
            domain: '.saptakarsa.com',
         });
         deleteCookie('data', { path: '/', domain: '.saptakarsa.com' });
         navigate('/login');
      } catch (error) {
         // do nothing
      }
   };
   const checkAccess = (name: string): boolean => {
      const pageAccess: string[] = data ? JSON.parse(data)?.access : [''];
      if (pageAccess.includes(name)) return true;
      return false;
   };

   return (
      <div
         className={`relative h-screen pb-[40px] ${
            show ? 'px-6' : 'px-3'
         }  flex flex-col duration-300 pt-[20px] bg-[#5C6EAA] rounded-r-[10px]`}
      >
         <div
            onClick={() => {
               handleSidebar();
            }}
            className={`absolute bg-[#6173ac]  top-[35px] right-[-10px]
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

            <p className={`text-white ${!show && 'hidden'}`}>Delevery note</p>
         </div>

         <div className={`flex flex-col gap-[20px] mt-14  w-max mx-auto`}>
            {menu.map((item, index) => {
               return (
                  <div key={index}>
                     {checkAccess(item.access) && (
                        <div
                           onClick={() => navigate(item.url)}
                           className={`cursor-pointer flex gap-[10px] items-center active:text-red-600  text-[#fff] hover:text-[#c5c5c5] ${
                              item.spaceY && 'mt-[30px]'
                           }`}
                        >
                           <TooltipComponent title={item.name}>
                              <div className="flex gap-[10px] items-center">
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
                     )}
                  </div>
               );
            })}

            <div
               onClick={() => logout()}
               className={`cursor-pointer flex gap-[10px] mt-[30px] active:text-red-600 items-center  text-[#fff] hover:text-[#c5c5c5]`}
            >
               <TooltipComponent title="Logout">
                  <div className="flex gap-[10px] items-center">
                     <LogOut className="w-[25px] h-[25px]" />
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
   );
};

export default HeaderY;
