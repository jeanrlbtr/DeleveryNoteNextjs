'use client';
import { ThemeProvider } from 'next-themes';
import React, { useEffect, useState } from 'react';

const ProviderThemes = ({ children }: { children: React.ReactNode }) => {
   const [isClient, setIsClient] = useState<boolean>(false);

   useEffect(() => {
      setIsClient(true);
   }, []);

   if (!isClient) {
      return <>{children}</>;
   }

   return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default ProviderThemes;
