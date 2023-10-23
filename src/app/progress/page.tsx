import ProgressSummary from '@/components/page/ProgressSummary/ProgressSummary';
import fetchingServer from '@/fetchingServer';
import { tanggal } from '@/lib/date';
import { ProgressSummaryT } from '@/types';

const Page = async () => {
   const AllItem = await fetchingServer<ProgressSummaryT>(
      '/delivery/v1/note/items?statusId=all&limit=10&page=1'
   );
   const allItemProgress = AllItem.data.filter((item) => {
      if (item.statusId !== 1 && item.statusId !== 3) {
         return item;
      }
   });

   const date = new Date();
   return (
      <div className="h-[100vh] w-[100%] pt-5 px-4 bg-white">
         <div className="mb-5">
            <p className="text-gray-600 font-medium text-xl">{tanggal(date)}</p>
         </div>
         <ProgressSummary allItem={{ data: allItemProgress }} />
      </div>
   );
};

export default Page;
