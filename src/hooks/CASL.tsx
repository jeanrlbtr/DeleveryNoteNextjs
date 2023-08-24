'use client';
import { UserDetail } from '@/types';
import { defineAbility } from '@casl/ability';
import { createContext } from 'react';
import { UseQueryFetching } from './UseQueryFetch';

const Casl = ({ children }: { children: any }) => {
   const { data: userModule } = UseQueryFetching<UserDetail>(
      '/delivery/v1/user/me',
      ['getModule']
   );
   const ability = defineAbility((can) => {
      if (userModule) {
         for (let i = 0; i < userModule.module.length; i++) {
            can(userModule.module[i].method, userModule.module[i]?.feature);
         }
      }
   });
   const AbilityContext = createContext(ability);
   return (
      <AbilityContext.Provider value={ability}>
         {children}
      </AbilityContext.Provider>
   );
};

export default Casl;
