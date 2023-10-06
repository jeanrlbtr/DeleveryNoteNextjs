import { Container } from '@/components/item';
import Shipment from '@/components/page/Shipment/Shipment';
import fetchingServer from '@/fetchingServer';
import { formatDate } from '@/lib/utils';
import { DataShipment, DriverDataT, UserMeType } from '@/types';

const page = async () => {
   const date = new Date();
   const userMe = await fetchingServer<UserMeType>('/delivery/v1/user/me');
   const shipmentDate = formatDate(date);
   const shipmentData = await fetchingServer<DataShipment>(
      `/delivery/v1/shipments?date=${shipmentDate}`
   );
   const driverData = await fetchingServer<DriverDataT>(`/delivery/v1/drivers`);

   return (
      <Container title="Transportation Info" dataUser={userMe}>
         <Shipment driverData={driverData} shipment={shipmentData.data} />
      </Container>
   );
};

export default page;
