'use client';

import { Container } from '@/components/item';
import { Dashboard } from '@/components/page';

export default function Home() {
  return (
    <Container title='Dashboard'>
      {/* <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <p className='text-[26px] text-[#525252]'>Welcome to Delivery note Website</p>
      </main> */}
      <Dashboard />
    </Container>
  );
}
