import { Container } from '@/components/item';
import User from '@/components/page/User/User';
import fetchingServer from '@/fetchingServer';
import { UserMeType } from '@/types';

const UserPage = async () => {
   const userMe = await fetchingServer<UserMeType>('/delivery/v1/user/me');

   return (
      <Container dataUser={userMe} title="Users">
         <User />
      </Container>
   );
};

export default UserPage;
