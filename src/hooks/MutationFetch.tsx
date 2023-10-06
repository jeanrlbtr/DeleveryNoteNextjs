'use client';
import { useToast } from '@/components/ui/use-toast';
import { axiosAuth } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

interface Params {
   url: string;
   method: string;
   body: any;
   headers: string;
}

interface Method {
   post: any;
   get: any;
   put: any;
   delete: any;
   patch: any;
}

const apiCall = ({ url, method, body, headers }: Params) => {
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
               const refresh = await axiosAuth.post(
                  '/delivery/auth/login/refresh',
                  { refresh_token }
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

   const METHOD: Method = {
      post: axiosAuth.post,
      get: axiosAuth.get,
      put: axiosAuth.put,
      delete: axiosAuth.delete,
      patch: axiosAuth.patch,
   };

   const HEADERS = {
      json: {
         headers: {
            'Content-Type': 'application/json',
         },
      },
      formData: {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      },
   };
   return METHOD[method as keyof typeof METHOD](
      url,
      body,
      HEADERS[headers as keyof typeof HEADERS]
   );
};

const MutationFetch = (key: string[]) => {
   const queryClient = useQueryClient();
   const { toast } = useToast();
   return useMutation({
      mutationFn: async ({ url, method, body, headers }: Params) => {
         try {
            const res = await apiCall({ url, method, body, headers });
            return res.data;
         } catch (error) {
            console.log(error);
         }
      },
      onSuccess: (res) => {
         toast({
            title: res.message || 'Success Update',
            duration: 3000,
         });
         return queryClient.invalidateQueries({ queryKey: key });
      },
      onError: (err: any) => {
         toast({
            title: 'Error Update',
            duration: 3000,
         });
      },
   });
};

export default MutationFetch;
