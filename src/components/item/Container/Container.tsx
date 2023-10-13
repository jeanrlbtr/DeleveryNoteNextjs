'use client';

import Casl from '@/hooks/CASL';
import { UseQueryFetching } from '@/hooks/UseQueryFetch';
import { UserMeType } from '@/types';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';
import Header from '../Header/Header';
import HeaderY from '../Header/HeaderY';

const Container = ({
   title,
   children,
   dataUser,
}: {
   title: string;
   children: React.ReactNode;
   dataUser: UserMeType;
}) => {
   const { setTheme, theme } = useTheme();
   // const { toast } = useToast();
   const [show, setShow] = React.useState<boolean>(false);
   // const token = getCookie('access_token');
   const date = new Date().toDateString();

   const { data: userData } = UseQueryFetching<UserMeType>(
      '/delivery/v1/user/me',
      ['getMe'],
      dataUser
   );

   // React.useEffect(() => {
   //    if (dataUser) {
   //       for (let i = 0; i < dataUser.data.module.length; i++) {
   //          if (dataUser.data.module[i].feature === 'event') {
   //             fetchEventSource(
   //                'https://staging.saptakarsa.com/gtw/delivery/v1/events/po',
   //                {
   //                   headers: {
   //                      Authorization: `Bearer ${token}`,
   //                   },
   //                   method: 'GET',
   //                   onmessage: (e: any) => {
   //                      if (e.data) {
   //                         const data = JSON.parse(e.data);
   //                         toast({
   //                            variant: 'notif',
   //                            title: data.title,
   //                            duration: 3000,
   //                            description: data.body,
   //                            color: 'green',
   //                         });
   //                      }
   //                   },
   //                }
   //             );
   //          }
   //       }
   //    }
   //    // eslint-disable-next-line
   // }, []);

   const handleShowSidebar = () => {
      setShow(!show);
   };
   return (
      <div className="h-full w-full flex md:flex-row flex-col relative">
         <div className="sticky hidden md:flex h-screen top-0 z-[9]">
            {userData && (
               <HeaderY
                  dataUser={userData}
                  handleSidebar={handleShowSidebar}
                  show={show}
               />
            )}
         </div>
         <div className="w-[100vw] md:hidden sticky z-[9] top-0">
            <Header
               name={userData && userData.data ? userData.data.name : ''}
               title={title}
            />
         </div>
         <div className="px-2 md:px-[30px] pb-[30px] pt-[20px] flex-1 h-screen mx-auto w-full max-w-[100vw] overflow-auto">
            <div className="mb-[30px] hidden md:flex justify-between items-center w-full">
               <div>
                  <p className="text-[30px] font-medium text-gray-700 dark:text-white">
                     {title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-100">
                     {String(date)}
                  </p>
               </div>
               <div className="flex items-center gap-[12px] ">
                  <div className="bg-[white] border-gray-500 dark:border-[white] border-[2.5px] rounded-full h-[50px] w-[50px] overflow-hidden relative">
                     <Image
                        src="/profile.png"
                        alt=""
                        fill
                        className="object-cover"
                     />
                  </div>
                  <div className="flex flex-col h-max justify-center ">
                     <div className="text-[18px] text-gray-500 dark:text-white capitalize font-semibold flex items-center">
                        <p>{userData?.data.name}</p>
                        <div className="flex">
                           {theme !== 'dark' ? (
                              <button
                                 onClick={() => setTheme('dark')}
                                 className="px-2"
                              >
                                 <Moon className="w-5 h-5" />
                              </button>
                           ) : (
                              <button
                                 onClick={() => setTheme('light')}
                                 className="px-2"
                              >
                                 <Sun className="w-5 h-5" />
                              </button>
                           )}
                        </div>
                     </div>
                     <span className="text-[13px] text-gray-800 dark:text-gray-100">
                        {userData?.data.level}
                     </span>
                  </div>
               </div>
            </div>
            <div>
               <Casl userDetail={userData && userData}>{children}</Casl>
            </div>
         </div>
      </div>
   );
};

export default Container;
