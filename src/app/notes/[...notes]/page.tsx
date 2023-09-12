import { Container } from '@/components/item';
import { DetailPO } from '@/components/page';
import fetchingServer from '@/fetchingServer';
import { DetailPoType, UserMeType } from '@/types';

const DetailNote = async ({ params }: { params: any }) => {
   const param: string = params.notes?.join('/');
   const newParam: string[] = param.split('');
   newParam.splice(0, 5);
   const noPo: string = newParam.join('');
   const detailPO = await fetchingServer<DetailPoType>(
      `/delivery/v1/note?no=${noPo}`
   );
   const userMe = await fetchingServer<UserMeType>('/delivery/v1/user/me');

   return (
      <Container dataUser={userMe} title={`Detail PO`}>
         {detailPO && <DetailPO noPo={noPo} detailPo={detailPO} />}
      </Container>
   );
};

export default DetailNote;
