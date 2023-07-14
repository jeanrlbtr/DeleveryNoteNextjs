import { ReactQueryProvider } from '@/hooks/ReactQueryProvider';
import '../global.css';
import { Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({ weight: ['300', '400', '500', '600'], subsets: ['latin'] });

export const metadata = {
  title: 'Delevery Note',
  description: 'see all notes for the delevery ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Toaster />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
