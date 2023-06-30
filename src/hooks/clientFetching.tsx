'use client';

import { useEffect } from 'react';
import { axiosAuth } from '@/lib/api';
import { getCookie } from 'cookies-next';

const ClientFetching = () => {
  const access_token = getCookie('access_token');
  const refresh_token = getCookie('refresh_token');

  useEffect(() => {
    const requestIntrercept = axiosAuth.interceptors.request.use((config) => {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${access_token}`;
      }
      return config;
    });
    return () => {
      axiosAuth.interceptors.request.eject(requestIntrercept);
    };
  }, [access_token, refresh_token]);

  return axiosAuth;
};

export default ClientFetching;
