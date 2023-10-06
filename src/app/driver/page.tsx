import { Container } from '@/components/item';
import Driver from '@/components/page/Driver/Driver';
import fetchingServer from '@/fetchingServer';
import { DriverInfoT, UserDataType, UserMeType } from '@/types';

const page = async () => {
   const driverInfo = await fetchingServer<DriverInfoT>('/delivery/v1/drivers');
   const userMe = await fetchingServer<UserMeType>('/delivery/v1/user/me');
   const userData = await fetchingServer<UserDataType>('/delivery/v1/users');

   return (
      <Container dataUser={userMe} title="Driver Info">
         <Driver userData={userData} driverData={driverInfo} />
      </Container>
   );
};

export default page;
