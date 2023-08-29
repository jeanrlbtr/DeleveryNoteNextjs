import { Container } from '@/components/item';
import { ItemPo } from '@/components/page';
import fetchingServer from '@/fetchingServer';
import { UserMeType } from '@/types';

const page = async () => {
   const userMe = await fetchingServer<UserMeType>('/delivery/v1/user/me');

   return (
      <Container title="Items Purchase Order" dataUser={userMe}>
         <div className="w-full ">
            <ItemPo />
         </div>
      </Container>
   );
};

export default page;
