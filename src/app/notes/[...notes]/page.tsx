import { Container } from '@/components/item';
import { DetailPO } from '@/components/page';
import { getDetailPO } from '@/fetchingServer/DetailPoFetching';

const DetailNote = async ({ params }: { params: any }) => {
   const param: string = params.notes?.join('/');
   const newParam: string[] = param.split('');
   newParam.splice(0, 5);
   const noPo: string = newParam.join('');
   const detailPO = await getDetailPO(noPo);
   // ${newParam.join('')}
   return (
      <Container title={`Detail PO`}>
         {detailPO && <DetailPO detailPo={detailPO} />}
      </Container>
   );
};

export default DetailNote;
