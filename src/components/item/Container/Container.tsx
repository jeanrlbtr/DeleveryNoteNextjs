'use client';

import { useToast } from '@/components/ui/use-toast';
import Casl from '@/hooks/CASL';
import { UseQueryFetching } from '@/hooks/UseQueryFetch';
import { UserMeType } from '@/types';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { getCookie } from 'cookies-next';
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
   dataUser: UserMeType | undefined;
}) => {
   const { toast } = useToast();
   const [show, setShow] = React.useState<boolean>(false);
   const token = getCookie('access_token');
   const date = new Date().toDateString();

   const { data } = UseQueryFetching<UserMeType>(
      '/delivery/v1/user/me',
      ['getMe'],
      dataUser
   );

   React.useEffect(() => {
      if (data) {
         for (let i = 0; i < data.module.length; i++) {
            if (data.module[i].feature === 'event') {
               fetchEventSource(
                  'https://staging.saptakarsa.com/gtw/delivery/v1/events/po',
                  {
                     headers: {
                        Authorization: `Bearer ${token}`,
                     },
                     method: 'GET',
                     onmessage: (e: any) => {
                        if (e.data) {
                           const data = JSON.parse(e.data);
                           toast({
                              variant: 'notif',
                              title: data.title,
                              duration: 3000,
                              description: data.body,
                              color: 'green',
                           });
                        }
                     },
                  }
               );
            }
         }
      }
      // eslint-disable-next-line
   }, []);

   const handleShowSidebar = () => {
      setShow(!show);
   };
   return (
      <div className="h-full w-full flex md:flex-row flex-col relative">
         <div className="sticky hidden md:flex h-screen top-0 z-[9]">
            {data && (
               <HeaderY
                  dataUser={data}
                  handleSidebar={handleShowSidebar}
                  show={show}
               />
            )}
         </div>
         <div className="w-[100vw] md:hidden fixed z-[9] right-0 top-0">
            <Header name={data ? data.name : ''} title={title} />
         </div>
         <div className="px-[30px] pb-[30px] pt-[20px] flex-1 h-screen mx-auto w-full max-w-[100vw] overflow-auto">
            <div className="mb-[30px] flex justify-between items-center w-full">
               <div>
                  <p className="text-[30px] font-medium text-gray-700">
                     {title}
                  </p>
                  <p className="text-sm text-gray-500">{String(date)}</p>
               </div>
               <div className="flex items-center gap-[12px]">
                  <div className="bg-[white] border-[white] border-[2.5px] rounded-full h-[50px] w-[50px] overflow-hidden relative">
                     <Image
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3MzkxODYzOA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                        alt=""
                        fill
                        className="object-cover"
                     />
                  </div>
                  <div className="flex flex-col h-max justify-center ">
                     <span className="text-[18px] capitalize font-semibold">
                        Jean Butar
                     </span>
                     <span className="text-[13px]  text-gray-500">
                        Customer Service
                     </span>
                  </div>
               </div>
            </div>
            <div>
               <Casl userDetail={data}>{children}</Casl>
            </div>
         </div>
      </div>
   );
};

export default Container;
