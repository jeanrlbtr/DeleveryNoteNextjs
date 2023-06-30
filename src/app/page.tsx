import { Container } from '@/components/item';
import Image from 'next/image';

export default function Home() {
  return (
    <Container title='Home'>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <p className='text-[26px] text-[#525252]'>Welcome to Delevery note Website</p>
      </main>
    </Container>
  );
}
