'use client';

import { UserDetail } from '@/types';
import { defineAbility } from '@casl/ability';
import { createContextualCan } from '@casl/react';
import { createContext } from 'react';
import { UseQueryFetching } from './UseQueryFetch';

export const CanRule = () => {
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
   const CanRule = createContextualCan(AbilityContext.Consumer);
   return CanRule;
};
