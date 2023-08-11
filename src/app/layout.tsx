import { ReactQueryProvider } from '@/hooks/ReactQueryProvider';
import '../global.css';
import { Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Casl from '@/hooks/CASL';

const poppins = Poppins({
   weight: ['300', '400', '500', '600'],
   subsets: ['latin'],
});

export const metadata = {
   title: 'Delivery Note',
   description: 'see all notes for the delevery ',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={poppins.className}>
            <Casl>
               <Toaster />
               <ReactQueryProvider>{children}</ReactQueryProvider>
            </Casl>
         </body>
      </html>
   );
}
