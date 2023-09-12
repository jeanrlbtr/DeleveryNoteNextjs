import { axiosAuth } from '@/lib/api';
import { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

async function fetchingServer<TypeFetch>(url: string) {
   const token = cookies().get('access_token')?.value;
   // try {
   const res: AxiosResponse<TypeFetch> = await axiosAuth.get(url, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return res.data;
   // } catch (error: unknown) {
   //    if (axios.isAxiosError(error)) {
   //       console.log(error.response?.data);
   //       throw new Error(error.response?.data);
   //    }
   // }
}

export default fetchingServer;
