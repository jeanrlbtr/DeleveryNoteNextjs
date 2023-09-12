import { Container } from '@/components/item';
import { Dashboard } from '@/components/page';
import fetchingServer from '@/fetchingServer';
import { DashboardType, UserMeType } from '@/types';

export default async function Home() {
   const dataDashboard = await fetchingServer<DashboardType>(
      '/delivery/v1/data/ui?chart[][data]=status&chart[][time]=year&chart[1][data]=activity&chart[2][data]=total&chart[3][data]=rank&chart[3][limit]=10&chart[3][time]=year'
   );

   const userMe = await fetchingServer<UserMeType>('/delivery/v1/user/me');
   return (
      <Container dataUser={userMe} title="Dashboard">
         <>{dataDashboard && <Dashboard data={dataDashboard} />}</>
      </Container>
   );
}
