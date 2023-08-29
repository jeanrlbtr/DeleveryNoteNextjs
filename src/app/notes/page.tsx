import { Container } from '@/components/item';
import { PurchaseOrder } from '@/components/page';
import fetchingServer from '@/fetchingServer';
import { UserMeType } from '@/types';
async function DeleveryNote() {
   const userMe = await fetchingServer<UserMeType>('/delivery/v1/user/me');

   return (
      <Container dataUser={userMe} title="Purchase Order">
         <PurchaseOrder />
      </Container>
   );
}

export default DeleveryNote;
