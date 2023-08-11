import axios from 'axios';
import { cookies } from 'next/headers';

const ServerFetching = () => {
   const baseURL = 'https://dev.saptakarsa.com';
   const axiosAuth = axios.create({
      baseURL,
   });
   const access_token: string = cookies().get('access_token')?.value || '';
   const refresh_token: string = cookies().get('refresh_token')?.value || '';
   axiosAuth.interceptors.request.use((config) => {
      if (!config.headers['Authorization']) {
         config.headers['Authorization'] = `Bearer ${access_token}`;
      }
      return config;
   });
   axiosAuth.interceptors.response.use(
      (response) => {
         return response;
      },
      async (error) => {
         if (error.response.status == 401) {
            try {
               const originalRequest = error.config;
               const refresh = await axiosAuth.post(
                  '/delivery/auth/login/refresh',
                  { refresh_token }
               );
               axiosAuth.defaults.headers.common['Authorization'] =
                  'Bearer ' + refresh.data.access_token;
               return axiosAuth(originalRequest);
            } catch (error) {
               Promise.reject(error);
            }
         }
      }
   );
   return axiosAuth;
};

export default ServerFetching;
