// 'use client';

import { Container } from '@/components/item';
import { Dashboard } from '@/components/page';
import { getDashboard } from '@/fetchingServer/DasboardFetching';

export default async function Home() {
   const dataDashboard = await getDashboard();
   return (
      <Container title="Dashboard">
         <div>{dataDashboard && <Dashboard data={dataDashboard} />}</div>
      </Container>
   );
}
