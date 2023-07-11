'use client';

import React from 'react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useForm } from 'react-hook-form';
import { useToast } from '../../../components/ui/use-toast';
import ClientFetching from '@/hooks/clientFetching';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';

interface Inputs {
  feature: string;
  method: string[];
}
const ModalPageAccess = () => {
  const { toast } = useToast();

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      method: [],
      feature: '',
    },
  });
  const axiosAction = ClientFetching();
  const queryClient = useQueryClient();
  const { mutate: postFeature, isLoading } = useMutation({
    mutationFn: async (body) => {
      const res = await axiosAction.post(`/delivery/v1/featurer`, body, {
        headers: {
          'Content-Type': 'multipart/json',
        },
      });
      return res.data;
    },
    onSuccess: (res) => {
      toast({
        title: res.message,
        duration: 3000,
      });
      return queryClient.invalidateQueries({ queryKey: ['getFeature'] });
    },
    onError: (error: any) => {
      if (error.response) {
        toast({
          title: error.response.data.message || error.message,
          duration: 3000,
        });
      }
    },
  });

  const handleSubmitFeature = async (data: any) => {
    if (data.method.length > 0 && data.feature) {
      postFeature(data);
    } else {
      toast({
        title: 'Cannot Post Features',
        description: 'min have 1 access and features name is required',
        duration: 3000,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit((data) => handleSubmitFeature(data))}>
      <div className='min-w-[250px] h-max shadow-lg rounded-[10px] p-3'>
        <div className='flex flex-col gap-[15px] mt-[20px]'>
          <Input
            placeholder='Feature'
            {...register('feature', {
              required: 'feature name is required',
            })}
          />
          <div className='flex items-center space-x-2'>
            <input
              id='create'
              type='checkbox'
              className='w-[15px]  border-[#d1cfcf]'
              value={'create'}
              {...register('method')}
            />
            <label
              htmlFor='create'
              className='text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Create
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <input
              id='update'
              type='checkbox'
              className='w-[15px]  border-[#d1cfcf]'
              value={'update'}
              {...register('method')}
            />
            <label
              htmlFor='update'
              className='text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Update
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <input
              id='read'
              type='checkbox'
              className='w-[15px]  border-[#d1cfcf]'
              value={'read'}
              {...register('method')}
            />
            <label
              htmlFor='read'
              className='text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Read
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <input
              id='delete'
              type='checkbox'
              className='w-[15px]  border-[#d1cfcf]'
              value={'delete'}
              {...register('method')}
            />
            <label
              htmlFor='delete'
              className='text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Delete
            </label>
          </div>
          <Button
            type='submit'
            className='h-max p-[1px] mt-[5px] text-[17px] bg-[#2e49e4] hover:bg-[#090961]'
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : 'Apply'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ModalPageAccess;
