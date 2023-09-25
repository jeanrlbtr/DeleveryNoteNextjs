import { axiosAuth } from '@/lib/api';
import { cookies } from 'next/headers';

const ServerFetching = () => {
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
         if (error.response?.status == 401) {
            console.log(error);
            try {
               const originalRequest = error.config;
               const refresh = await axiosAuth.post(
                  '/delivery/auth/login/refresh',
                  { refresh_token }
               );
               console.log(refresh);
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
