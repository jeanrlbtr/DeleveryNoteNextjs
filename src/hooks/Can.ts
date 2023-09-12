'use client';

import { UserMeType } from '@/types';
import { defineAbility } from '@casl/ability';
import { createContextualCan } from '@casl/react';
import { createContext } from 'react';
import { UseQueryFetching } from './UseQueryFetch';

export const CanRule = () => {
   const { data: userModule } = UseQueryFetching<UserMeType>(
      '/delivery/v1/user/me',
      ['getModule']
   );
   const ability = defineAbility((can) => {
      if (userModule) {
         for (let i = 0; i < userModule.data.module.length; i++) {
            can(
               userModule.data.module[i].method,
               userModule.data.module[i]?.feature
            );
         }
      }
   });
   const AbilityContext = createContext(ability);
   const CanRule = createContextualCan(AbilityContext.Consumer);
   return CanRule;
};
