'use client';

import { deleteCookie, getCookie } from 'cookies-next';
import {
   FileStack,
   LayoutPanelLeft,
   LogOut,
   PackageCheck,
   TruckIcon,
   User,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Sidebar = ({ name }: { name: string }) => {
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
      const pageAccess: string[] = JSON.parse(data)?.access;
      if (pageAccess.includes(name)) return true;
      return false;
   };
   return (
      <div className="min-h-[100vh] z-10">
         <div className="mx-auto w-max ">
            <div className="bg-[white] mx-auto border-[white] border-[1.5px]  rounded-full h-[110px] w-[110px] overflow-hidden relative mt-[50px]">
               <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3MzkxODYzOA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                  alt=""
                  fill
                  className="object-cover"
               />
            </div>
            <div className="mt-4">
               <p className="capitalize mx-auto w-max font-Poppins text-[19px] text-[#fff]">
                  {name}
               </p>
               <p className="capitalize mx-auto w-max font-Poppins text-[15px] text-[#fff]">
                  Admin
               </p>
            </div>
            <div className="mt-12 flex flex-col h-[250px] md:h-[300px] justify-between w-max mx-auto">
               <div className="flex flex-col gap-[15px]">
                  {checkAccess('/') && (
                     <div
                        onClick={() => navigate('/')}
                        className="cursor-pointer flex gap-[10px] items-center active:text-red-600  text-[#fff] hover:text-[#c5c5c5]"
                     >
                        <LayoutPanelLeft className="w-[25px] h-[25px]" />
                        <p className="capitalize">Dashboard</p>
                     </div>
                  )}
                  {checkAccess('level') && (
                     <div
                        onClick={() => navigate('/level')}
                        className="cursor-pointer flex gap-[10px] items-center active:text-red-600  text-[#fff] hover:text-[#c5c5c5] "
                     >
                        <FileStack />
                        <p className="capitalize  ">Level</p>
                     </div>
                  )}
                  {checkAccess('notes') && (
                     <div
                        onClick={() => navigate('/notes')}
                        className="cursor-pointer flex gap-[10px] items-center active:text-red-600  text-[#fff] hover:text-[#c5c5c5]"
                     >
                        <TruckIcon className="w-[25px] h-[25px]" />
                        <p className="capitalize">purchase order</p>
                     </div>
                  )}
                  {checkAccess('item') && (
                     <div
                        onClick={() => navigate('/item')}
                        className="cursor-pointer flex gap-[10px] items-center active:text-red-600  text-[#fff] hover:text-[#c5c5c5] "
                     >
                        <PackageCheck />
                        <p className="capitalize">Items Check</p>
                     </div>
                  )}
                  {checkAccess('users') && (
                     <div
                        onClick={() => navigate('/users')}
                        className="cursor-pointer flex gap-[10px] items-center active:text-red-600  text-[#fff] hover:text-[#c5c5c5] "
                     >
                        <User className="w-[25px] h-[25px]" />
                        <p className="capitalize">Users</p>
                     </div>
                  )}
               </div>

               <div
                  onClick={() => logout()}
                  className="cursor-pointer flex gap-[10px] active:text-red-600 items-center text-[#fff] hover:text-[#c5c5c5] "
               >
                  <LogOut className="w-[25px] h-[25px]" />
                  <p className="capitalize ">logout</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
