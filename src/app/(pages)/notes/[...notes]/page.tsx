import { DetailPO } from '@/components/page';
import fetchingServer from '@/fetchingServer';
import { DetailPoType } from '@/types';

const DetailNote = async ({ params }: { params: any }) => {
   const param: string = params.notes?.join('/');
   const newParam: string[] = param.split('');
   newParam.splice(0, 5);
   const noPo: string = newParam.join('');
   const detailPO = await fetchingServer<DetailPoType>(
      `/delivery/v1/note?no=${noPo}`
   );

   return <>{detailPO && <DetailPO noPo={noPo} detailPo={detailPO} />}</>;
};

export default DetailNote;
