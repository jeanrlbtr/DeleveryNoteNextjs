import { axiosAuth } from '@/lib/api';
import { DetailPoType } from '@/types';
import { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

async function getDetailPO(param: string) {
   const token = cookies().get('access_token')?.value || '';
   const res: AxiosResponse<DetailPoType> = await axiosAuth.get(
      `/delivery/v1/note?no=${param}`,
      {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }
   );
   return res.data;
}

export { getDetailPO };
