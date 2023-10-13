import Shipment from '@/components/page/Shipment/Shipment';
import fetchingServer from '@/fetchingServer';
import { formatDate } from '@/lib/utils';
import { DataShipment, DriverDataT } from '@/types';

const page = async () => {
   const date = new Date();
   const shipmentDate = formatDate(date);
   const shipmentData = await fetchingServer<DataShipment>(
      `/delivery/v1/shipments?date=${shipmentDate}`
   );
   const driverData = await fetchingServer<DriverDataT>(`/delivery/v1/drivers`);

   return <Shipment driverData={driverData} shipment={shipmentData.data} />;
};

export default page;
