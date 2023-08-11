'use client';
import { ability } from '@/lib/ability';
import React from 'react';
import { createContext } from 'react';

const Casl = ({ children }: { children: any }) => {
   const AbilityContext = createContext(ability);
   return (
      <AbilityContext.Provider value={ability}>
         {children}
      </AbilityContext.Provider>
   );
};

export default Casl;
