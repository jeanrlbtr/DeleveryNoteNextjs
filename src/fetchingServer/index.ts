import { axiosAuth } from '@/lib/api';
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

async function customFetching<TypeFetch>(url: string) {
   const token = cookies().get('access_token')?.value;
   try {
      const res: AxiosResponse<TypeFetch> = await axiosAuth.get(url, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return res.data;
   } catch (error: unknown) {
      if (axios.isAxiosError(error)) throw new Error(error.response?.data);
   }
}

export default customFetching;
