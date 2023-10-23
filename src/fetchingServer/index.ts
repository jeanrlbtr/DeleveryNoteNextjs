import ServerFetching from '@/hooks/serverFetching';
import { AxiosResponse } from 'axios';

async function fetchingServer<TypeFetch>(url: string) {
   // try {
   const axios = ServerFetching();
   const res: AxiosResponse<TypeFetch> = await axios.get(url, {});
   return res.data;
   // } catch (error: unknown) {
   //    if (axios.isAxiosError(error)) {
   //       console.log(error.response?.data);
   //       throw new Error(error.response?.data);
   //    }
   // }
}

export default fetchingServer;
