'use client';

import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/button';
import ControllerInput from '../Input/ControllerInput';
import ControllerCheck from '../Input/ControllerCheck';
import ControllerSelect from '../Input/ControllerSelect';
import { useToast } from '../../../components/ui/use-toast';
import AsyncSelect from 'react-select/async';
import ClientFetching from '@/hooks/clientFetching';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';

interface User {
  id: string;
  name: string;
  username: string;
  autoUpdate: boolean;
  levelId: number;
  password: string;
  image: any;
  isActive: boolean;
}

const UserForm = ({ level }: { level: any[] }) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const axiosAction = ClientFetching();
  const defaultValuesUser: User = {
    id: '',
    name: '',
    username: '',
    password: '',
    isActive: false,
    autoUpdate: false,
    levelId: 0,
    image: '',
  };

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<User>({ defaultValues: defaultValuesUser });

  const { mutate: postUser, isLoading } = useMutation({
    mutationFn: async (body) => {
      const res = await axiosAction.post(`/delivery/v1/user/register`, body, {
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

  const addUser = async (data: any) => {
    const body: any = {};
    for (let i in data) {
      if (data[i]) body[`${i}`] = data[i];
    }
    postUser(body);
  };

  const disable = Object.keys(errors).length > 0;
  const loadOptions = async (inputValue: any) => {
    if (inputValue) {
      const url = `/delivery/v1/employee?name=${inputValue}`;
      return axiosAction.get(url).then((res) => {
        const result = res.data;
        return result;
      });
    }
    return;
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        addUser(data);
      })}
      className='md:w-[700px]'
    >
      <div className='mb-[10px]'>
        <div className='w-full'>
          <div className='mb-[10px] md:flex md:items-center md:justify-between'>
            <label htmlFor=''>Name</label>
            <div className='w-[500px]'>
              <AsyncSelect
                defaultOptions
                getOptionLabel={(e: any) => e.full_name}
                getOptionValue={(e: any) => e.id}
                cacheOptions
                loadOptions={loadOptions}
                onChange={(e: any) => {
                  setValue('name', e.full_name);
                  setValue('id', e.id);
                  setValue('username', e.username);
                }}
              />
            </div>
          </div>
        </div>
        <div className='w-full'>
          <ControllerInput
            errors={errors}
            defaultValue={defaultValuesUser.username}
            className='mb-[10px] md:flex md:items-center md:justify-between'
            name='username'
            rules={{
              required: 'Username must be required',
            }}
            title='Usename'
            control={control}
            type='text'
          />
        </div>
        <div className='w-full'>
          <ControllerInput
            errors={errors}
            className='mb-[10px] md:flex md:items-center md:justify-between'
            name='password'
            rules={{
              required: 'password must be required',
              maxLength: { value: 9, message: 'username Max length 9 characters' },
              minLength: { value: 6, message: 'username Min length 6 characters' },
            }}
            title='Password'
            control={control}
            type='password'
          />
        </div>
        <div className='w-full'>
          <ControllerCheck
            className='mb-[10px] md:flex md:items-center md:justify-between'
            name='isActive'
            rules={{}}
            title='Is Active'
            control={control}
            type='checkbox'
          />
        </div>
        <div className='w-full'>
          <ControllerCheck
            className='mb-[10px] md:flex md:items-center md:justify-between'
            name='autoUpdate'
            rules={{}}
            title='Auto Update'
            control={control}
            type='checkbox'
          />
        </div>
        <div className='w-full'>
          <ControllerSelect
            level={level}
            className='mb-[10px] md:flex md:items-center md:justify-between'
            name='levelId'
            rules={{
              required: 'level id must be required',
            }}
            title='Level Id'
            control={control}
            type='select'
          />
        </div>
        <div className='w-full'>
          <ControllerInput
            errors={errors}
            className='mb-[10px] md:flex md:items-center md:justify-between'
            name='image'
            rules={{}}
            title='Photo'
            control={control}
            type='file'
          />
        </div>
      </div>
      <div className='flex justify-end'>
        <Button
          className='mt-[20px]'
          type='submit'
          disabled={disable || isLoading}
        >
          {isLoading ? <Loader /> : 'submit'}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
