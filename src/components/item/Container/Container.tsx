' use client';

import { useToast } from '@/components/ui/use-toast';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { getCookie } from 'cookies-next';
import React, { useState } from 'react';
import Header from '../Header/Header';

const Container = ({
   title,
   children,
}: {
   title: string;
   children: React.ReactNode;
}) => {
   const { toast } = useToast();
   const [data, setData] = useState<any>({});
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

   return (
      <div className="h-full relative">
         <div className="sticky top-0 z-[9]">
            <Header name={data.name || ''} title={title} />
         </div>
         <div className="p-[20px]  mx-auto">{children}</div>
      </div>
   );
};

export default Container;
