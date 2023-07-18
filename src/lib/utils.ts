import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ClientFetching from '@/hooks/clientFetching';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
