import { Toaster } from '@/components/ui/toaster';
import { ReactQueryProvider } from '@/hooks/ReactQueryProvider';
import 'flatpickr/dist/flatpickr.css';
import { Montserrat } from 'next/font/google';
import '../global.css';
import ProviderThemes from './provider';

const montserrat = Montserrat({
   subsets: ['cyrillic'],
   weight: ['100', '300', '400', '500', '600', '700'],
});

export const metadata = {
   title: 'Delivery Note',
   description: 'see all notes for the delevery',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" className="light">
         <body
            className={`bg-[#f5f5f5] dark:bg-[#323a67] ${montserrat.className}`}
         >
            <ProviderThemes>
               <ReactQueryProvider>
                  <Toaster />
                  {children}
               </ReactQueryProvider>
            </ProviderThemes>
         </body>
      </html>
   );
}
