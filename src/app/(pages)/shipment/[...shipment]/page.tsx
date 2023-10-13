import Transportation from '@/components/page/Transportation/Transportation';
import fetchingServer from '@/fetchingServer';
import { DetailShipmentT } from '@/types';

interface Props {
   params: {
      shipment: string[];
   };
}

const page = async ({ params }: Props) => {
   const shipmentId = params.shipment[0];
   const detailShipment = await fetchingServer<DetailShipmentT>(
      `/delivery/v1/shipment/${shipmentId}`
   );
   return <Transportation shipmentDetail={detailShipment} />;
};

export default page;
