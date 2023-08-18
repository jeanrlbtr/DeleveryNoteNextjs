import { axiosAuth } from '@/lib/api';
import { UserDataType } from '@/types';
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

async function getUsers() {
   const token = cookies().get('access_token')?.value || '';
   try {
      const res: AxiosResponse<UserDataType> = await axiosAuth.get(
         '/delivery/v1/users',
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

export { getUsers };
