import { axiosAuth } from '@/lib/api';
import { LevelType } from '@/types';
import { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

async function getLevel() {
   const token = cookies().get('access_token')?.value;
   const res: AxiosResponse<LevelType> = await axiosAuth.get(
      `/delivery/v1/levels`,
      {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }
   );
   return res.data;
}

export { getLevel };
