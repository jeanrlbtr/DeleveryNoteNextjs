' use client';

import React from 'react';
import Header from '../Header/Header';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { getCookie } from 'cookies-next';
import { useToast } from '@/components/ui/use-toast';
const Container = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [notification, setNotification] = React.useState();
  const { toast } = useToast();
  const token = getCookie('access_token');
  React.useEffect(() => {
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
  }, []);
  return (
    <div className='h-full relative'>
      <div className='sticky top-0'>
        <Header title={title} />
      </div>
      <div className='w-[97%] mt-[40px] mx-auto'>{children}</div>
    </div>
  );
};

export default Container;
