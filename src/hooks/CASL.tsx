'use client';
import { UserMeType } from '@/types';
import { defineAbility } from '@casl/ability';
import { createContext } from 'react';

const Casl = ({
   children,
   userDetail,
}: {
   children: React.ReactNode;
   userDetail: UserMeType | undefined;
}) => {
   const ability = defineAbility((can) => {
      if (userDetail) {
         for (let i = 0; i < userDetail.data.module.length; i++) {
            can(
               userDetail.data.module[i].method,
               userDetail.data.module[i]?.feature
            );
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
