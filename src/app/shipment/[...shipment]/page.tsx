import { Container } from '@/components/item';
import Transportation from '@/components/page/Transportation/Transportation';
import fetchingServer from '@/fetchingServer';
import { DetailShipmentT, UserMeType } from '@/types';

interface Props {
   params: {
      shipment: string[];
   };
}

const page = async ({ params }: Props) => {
   const shipmentId = params.shipment[0];
   const userMe = await fetchingServer<UserMeType>('/delivery/v1/user/me');
   const detailShipment = await fetchingServer<DetailShipmentT>(
      `/delivery/v1/shipment/${shipmentId}`
   );
   return (
      <Container title="Transportation Info" dataUser={userMe}>
         <Transportation shipmentDetail={detailShipment} />
      </Container>
   );
};

export default page;
