import Driver from '@/components/page/Driver/Driver';
import fetchingServer from '@/fetchingServer';
import { DriverInfoT, UserDataType } from '@/types';

const page = async () => {
   const driverInfo = await fetchingServer<DriverInfoT>('/delivery/v1/drivers');
   const userData = await fetchingServer<UserDataType>('/delivery/v1/users');

   return <Driver userData={userData} driverData={driverInfo} />;
};

export default page;
