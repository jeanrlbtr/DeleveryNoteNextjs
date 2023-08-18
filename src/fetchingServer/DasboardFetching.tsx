import { axiosAuth } from '@/lib/api';
import { DashboardType } from '@/types';
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

async function getDashboard() {
   const token = cookies().get('access_token')?.value;
   try {
      const res: AxiosResponse<DashboardType> = await axiosAuth.get(
         '/delivery/v1/data/ui?chart[][data]=status&chart[][time]=year&chart[1][data]=activity&chart[2][data]=total&chart[3][data]=rank&chart[3][limit]=10&chart[3][time]=year',
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return res.data;
   } catch (error: unknown) {
      if (axios.isAxiosError(error)) throw new Error(error.response?.data);
   }
}

export { getDashboard };
