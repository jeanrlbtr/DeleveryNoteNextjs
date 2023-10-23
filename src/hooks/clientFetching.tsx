'use client';

import { axiosAuth } from '@/lib/api';
import { getCookie } from 'cookies-next';

const ClientFetching = () => {
   const access_token = getCookie('access_token');
   const refresh_token = getCookie('refresh_token');

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
               console.log(refresh_token);
               const refresh = await axiosAuth.post(
                  '/delivery/auth/login/refresh',
                  { refresh_token },
                  {
                     withCredentials: true,
                  }
               );
               axiosAuth.defaults.headers.common['Authorization'] =
                  'Bearer ' + refresh.data.access_token;
               return axiosAuth(originalRequest);
            } catch (error: any) {
               return Promise.reject(error);
            }
         }
         throw error;
      }
   );

   return axiosAuth;
};

export default ClientFetching;
