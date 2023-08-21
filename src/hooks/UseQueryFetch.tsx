'use client';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import ClientFetching from './clientFetching';

function UseQueryFetching<FetchingType>(
   url: string,
   key: Array<string | number>,
   initialData?: FetchingType
) {
   const axiosFetching = ClientFetching();
   const fetchData = async () => {
      const res: AxiosResponse<FetchingType> = await axiosFetching.get(url);
      return res.data;
   };
   return useQuery({
      queryKey: key,
      queryFn: fetchData,
      initialData: initialData,
   });
}

export { UseQueryFetching };
