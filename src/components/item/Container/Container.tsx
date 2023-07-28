' use client';

import React from 'react';
import Header from '../Header/Header';
import { fetchEventSource, EventStreamContentType } from '@microsoft/fetch-event-source';
import { getCookie } from 'cookies-next';
import { useToast } from '@/components/ui/use-toast';

const Container = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const { toast } = useToast();
  const token = getCookie('access_token');
  const dataUser: any = localStorage.getItem('data');

  React.useEffect(() => {
    const jsonParse = JSON?.parse(dataUser);
    const event = [];
    for (let i = 0; i < jsonParse.module.length; i++) {
      if (jsonParse.module[i].feature === 'event') {
        event.push(jsonParse.module);
      }
    }

    if (event.length > 0) {
      fetchEventSource('https://dev.saptakarsa.com/gtw/delivery/v1/events/po', {
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
        <Header title={title} />
      </div>
      <div className='w-[97%] mt-[40px]  mx-auto'>{children}</div>
    </div>
  );
};

export default Container;
