import { Container } from '@/components/item';
import fetchingServer from '@/fetchingServer';
import { UserMeType } from '@/types';
import React from 'react';

const layout = async ({ children }: { children: React.ReactNode }) => {
   const userMe = await fetchingServer<UserMeType>('/delivery/v1/user/me');

   return (
      <section>
         <Container dataUser={userMe} title="Delevery Note">
            {children}
         </Container>
      </section>
   );
};

export default layout;
