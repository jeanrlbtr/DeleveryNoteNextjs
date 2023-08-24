'use client';

import { useToast } from '@/components/ui/use-toast';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { getCookie } from 'cookies-next';
import React from 'react';
import Header from '../Header/Header';
import HeaderY from '../Header/HeaderY';

const Container = ({
   title,
   children,
}: {
   title: string;
   children: React.ReactNode;
}) => {
   const { toast } = useToast();
   const [show, setShow] = React.useState<boolean>(false);
   const [data, setData] = React.useState<any>({});
   const token = getCookie('access_token');
   React.useEffect(() => {
      const dataUser: any = localStorage.getItem('data');
      const jsonParse = JSON?.parse(dataUser);
      setData(jsonParse);
      for (let i = 0; i < jsonParse.module.length; i++) {
         if (jsonParse.module[i].feature === 'event') {
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
      // eslint-disable-next-line
   }, []);

   const handleShowSidebar = () => {
      setShow(!show);
   };
   return (
      <div className="h-full w-full flex md:flex-row flex-col relative">
         <div className="sticky hidden md:flex h-screen top-0 z-[9]">
            <HeaderY handleSidebar={handleShowSidebar} show={show} />
         </div>
         <div className="w-[100vw] md:hidden fixed z-[9] right-0 top-0">
            <Header name={data.name} title={title} />
         </div>
         <div className="p-[20px] md:p-[40px] flex-1 h-screen mx-auto max-w-[100vw] overflow-auto">
            {children}
         </div>
      </div>
   );
};

export default Container;
