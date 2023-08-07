' use client';

import React, { useState } from 'react';
import Header from '../Header/Header';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { getCookie } from 'cookies-next';
import { useToast } from '@/components/ui/use-toast';

const Container = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const { toast } = useToast();
  const [data, setData] = useState<any>({});
  const token = getCookie('access_token');
  React.useEffect(() => {
    const dataUser: any = localStorage.getItem('data');
    const jsonParse = JSON?.parse(dataUser);
    setData(jsonParse);
    const event = [];
    for (let i = 0; i < jsonParse.module.length; i++) {
      if (jsonParse.module[i].feature === 'event') {
        event.push(jsonParse.module);
      }
    }

    if (event.length > 0) {
      fetchEventSource('https://staging.saptakarsa.com/gtw/delivery/v1/events/po', {
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
      });
    }
  }, []);
  return (
    <div className='h-full relative'>
      <div className='sticky top-0 z-[9]'>
        <Header
          name={data.name || ''}
          title={title}
        />
      </div>
      <div className='p-[20px]  mx-auto'>{children}</div>
    </div>
  );
};

export default Container;
