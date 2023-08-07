'use client';

import { defineAbility } from '@casl/ability';
import { createContextualCan } from '@casl/react';
import { createContext } from 'react';
import { getCookie } from 'cookies-next';

const data: string = getCookie('data')?.toString() || '';
const userAccess: string[] = JSON.parse(data)?.access;
const ability = defineAbility((can) => {
  for (let i = 0; i < userAccess.length; i++) {
    can(userAccess[i], userAccess[i]);
  }
});

const AbilityContext = createContext(ability);

export const Can = createContextualCan(AbilityContext.Consumer);
