import { Container } from '@/components/item';
import { ItemPo } from '@/components/page';
import fetchingServer from '@/fetchingServer';
import { StatusItem, UserMeType } from '@/types';

const page = async () => {
   const userMe = await fetchingServer<UserMeType>('/delivery/v1/user/me');
   const statusItem = await fetchingServer<StatusItem>('/delivery/v1/statuses');

   return (
      <Container title="Items Purchase Order" dataUser={userMe}>
         <div className="w-full">
            <ItemPo data={statusItem.data} />
         </div>
      </Container>
   );
};

export default page;
