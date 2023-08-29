import { Container } from '@/components/item';
import ProgressSummary from '@/components/page/ProgressSummary/ProgressSummary';
import fetchingServer from '@/fetchingServer';
import { UserMeType } from '@/types';

const Page = async () => {
   const userMe = await fetchingServer<UserMeType>('/delivery/v1/user/me');

   return (
      <Container dataUser={userMe} title="Progress Summary">
         <ProgressSummary />
      </Container>
   );
};

export default Page;
