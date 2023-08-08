'use client';

import { ability } from '@/lib/ability';
import { createContextualCan } from '@casl/react';
import { createContext } from 'react';

const AbilityContext = createContext(ability);

export const Can = createContextualCan(AbilityContext.Consumer);
