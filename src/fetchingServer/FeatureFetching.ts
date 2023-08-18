import { axiosAuth } from '@/lib/api';
import { FeatureType } from '@/types';
import { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

async function getFeature() {
   const token = cookies().get('access_token')?.value;
   const res: AxiosResponse<FeatureType> = await axiosAuth.get(
      `/delivery/v1/feature`,
      {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }
   );
   return res.data;
}

export { getFeature };
