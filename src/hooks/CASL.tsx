'use client';
import React from 'react';
import { createContext } from 'react';
import { defineAbility } from '@casl/ability';
import { getCookie } from 'cookies-next';
const Casl = ({ children }: { children: any }) => {
  const data: string = getCookie('data')?.toString() || '';
  const userAccess: string[] = JSON.parse(data)?.access;
  const ability = defineAbility((can) => {
    for (let i = 0; i < userAccess.length; i++) {
      can(userAccess[i], userAccess[i]);
    }
  });
  const AbilityContext = createContext(ability);
  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
};

export default Casl;
