'use client';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ClientFetching from './clientFetching';

interface Params {
  url: string;
  method: any;
  body: any;
  headers: string;
}

const API = ClientFetching();

const apiCall = ({ url, method, body, headers }: Params) => {
  const METHOD = {
    post: API.post,
    get: API.get,
    put: API.put,
    delete: API.delete,
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
  return METHOD[method](url, body, HEADERS[headers]);
};

const MutationFetch = () => {
  const queryClient = useQueryClient();
  const axiosFetching = ClientFetching();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (body) => {
      const res = await axiosFetching.post(`/delivery/v1/user/register`, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    },
    onSuccess: (res) => {
      toast({
        title: res.message,
        duration: 3000,
      });
      return queryClient.invalidateQueries({ queryKey: ['getUser'] });
    },
    onError: (error: any) => {
      if (error.response) {
        toast({
          title: error.response.data.message,
          duration: 3000,
        });
      }
    },
  });
};

export default MutationFetch;
