import { Toaster } from '@/components/ui/toaster';
import { ReactQueryProvider } from '@/hooks/ReactQueryProvider';
import { Montserrat } from 'next/font/google';
import '../global.css';

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
      <html lang="en">
         <body className={montserrat.className}>
            <ReactQueryProvider>
               <Toaster />
               {children}
            </ReactQueryProvider>
         </body>
      </html>
   );
}
