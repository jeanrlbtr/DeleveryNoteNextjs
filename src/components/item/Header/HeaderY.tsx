'use client';

import { UserMeType } from '@/types';
import { deleteCookie } from 'cookies-next';
import {
   ChevronLeft,
   ChevronRight,
   CreditCard,
   FileStack,
   FolderKanban,
   LayoutPanelLeft,
   LifeBuoy,
   LogOut,
   PackageCheck,
   TruckIcon,
   User,
} from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import TooltipComponent from '../Tooltip/Tooltip';

interface HeaderYProps {
   handleSidebar: () => void;
   show: boolean;
   dataUser: UserMeType;
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
      name: 'Surat Jalan',
      icon: <TruckIcon className="w-[25px] h-[25px]" />,
      url: '/notes',
      access: 'notes',
      spaceY: false,
   },
   {
      name: 'Progres Item',
      icon: <FolderKanban className="w-[25px] h-[25px]" />,
      url: '/progress',
      access: 'progress',
      spaceY: false,
   },
   {
      name: 'Item Status',
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
      name: 'Biaya Perjalanan',
      icon: <CreditCard className="w-[25px] h-[25px]" />,
      url: '/shipment',
      access: 'shipment',
      spaceY: false,
   },
   {
      name: 'Supir',
      icon: <LifeBuoy className="w-[25px] h-[25px]" />,
      url: '/driver',
      access: 'driver',
      spaceY: false,
   },
   {
      name: 'User',
      icon: <User className="w-[25px] h-[25px]" />,
      url: '/users',
      access: 'users',
      spaceY: false,
   },
];

const HeaderY = ({ handleSidebar, show, dataUser }: HeaderYProps) => {
   const route = useRouter();
   const pathname = usePathname();
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
      const pageAccess: string[] = dataUser.data.access;
      if (pageAccess.includes(name)) return true;
      return false;
   };

   return (
      <div
         className={`relative h-screen pb-[40px] ${
            show ? 'px-6' : 'px-3'
         }  flex flex-col duration-300 pt-[20px] bg-[#252851] rounded-r-[10px]`}
      >
         <div
            onClick={() => {
               handleSidebar();
            }}
            className={`absolute bg-[#292c5c]  top-[35px] right-[-10px]
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
         <div className={`flex flex-col gap-[7px] mt-14  w-max mx-auto`}>
            {menu.map((item, index) => {
               return (
                  <div
                     className={`${!checkAccess(item.access) && 'hidden'}`}
                     key={index}
                  >
                     <div
                        onClick={() => navigate(item.url)}
                        className={`cursor-pointer flex gap-[10px] rounded-md ${
                           item.url === pathname
                              ? 'bg-[#292E5A] text-[#fff]'
                              : 'text-gray-400'
                        } p-2 items-center active:text-red-600  hover:text-[#fff]  ${
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
                  </div>
               );
            })}

            <div
               onClick={() => logout()}
               className={`cursor-pointer flex p-2 gap-[10px] mt-[30px] active:text-red-600 items-center  hover:text-[#fff] text-gray-400`}
            >
               <TooltipComponent title="Logout">
                  <div className="flex gap-[10px] items-center">
                     <LogOut className="w-[25px] h-[25px]" />
                     <p
                        className={`capitalize duration-300 ease-in-out ${
                           !show && 'scale-0 hidden'
                        }`}
                     >
                        Keluar
                     </p>
                  </div>
               </TooltipComponent>
            </div>
         </div>
      </div>
   );
};

export default HeaderY;
