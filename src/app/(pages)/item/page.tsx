import { ItemPo } from '@/components/page';
import fetchingServer from '@/fetchingServer';
import { StatusItem } from '@/types';

const page = async () => {
   const statusItem = await fetchingServer<StatusItem>('/delivery/v1/statuses');

   return (
      <div className="w-full">
         <ItemPo data={statusItem.data} />
      </div>
   );
};

export default page;
