'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { API } from '@/lib/api';
import { useToast } from '../../../components/ui/use-toast';

interface User {
  name: string;
  username: string;
  autoUpdate: boolean;
  levelId: number;
  password: string;
  image: any;
  isActive: boolean;
}

const EditUserForm = ({ defaultValue, level }: { defaultValue?: any; level: any[] }) => {
  const { toast } = useToast();

  const defaultValuesUser = {
    name: defaultValue.name,
    username: defaultValue.username,
    password: '',
    isActive: defaultValue.isActive,
    autoUpdate: defaultValue.autoUpdate,
    levelId: defaultValue.levelUser.id,
    image: '',
  };
  const [user, setUser] = useState<any>({});
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<User>({ defaultValues: defaultValuesUser });

  const editUser = async (data: any) => {
    const formdata = new FormData();
    for (let i in data) {
      if (data[i]) formdata.set(i, data[i]);
    }
    console.log(formdata);
    try {
      const res = await API.put(`/delivery/v1/user/${defaultValue.id}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        title: res.data.message,
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: error.message,
        duration: 3000,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        editUser(data);
      })}
      className='md:w-[700px]'
    >
      <div className='mb-[10px] md:flex md:items-center md:justify-between'>
        <label htmlFor=''>Name</label>
        <div className='w-max md:w-[500px]'>
          <Input
            placeholder='Name'
            defaultValue={defaultValuesUser.name}
            {...register('name', {})}
          />
        </div>
      </div>
      <div className='mb-[10px] md:flex md:items-center md:justify-between'>
        <label htmlFor=''>Username</label>
        <div className='w-max md:w-[500px]'>
          <Input
            placeholder='Username'
            defaultValue={defaultValuesUser.username}
            {...register('username', {})}
          />
        </div>
      </div>
      <div className='mb-[10px] md:flex md:items-center md:justify-between'>
        <label htmlFor=''>Password</label>
        <div className='w-max md:w-[500px]'>
          <Input
            placeholder='Password'
            type='password'
            defaultValue={defaultValuesUser.password}
            {...register('password', {})}
          />
        </div>
      </div>
      <div className='mb-[20px] md:flex md:items-center md:justify-between'>
        <label htmlFor=''>Is Actived</label>
        <div className='w-max md:w-[500px]'>
          <input
            type='checkbox'
            className='cursor-pointer'
            {...register('isActive')}
          />
        </div>
      </div>
      <div className='mb-[20px] md:flex md:items-center md:justify-between'>
        <label htmlFor=''>Auto Update</label>
        <div className='w-max md:w-[500px]'>
          <input
            type='checkbox'
            className='cursor-pointer'
            {...register('autoUpdate')}
          />
        </div>
      </div>
      <div className='mb-[10px] md:flex md:items-center md:justify-between'>
        <label htmlFor=''>Level Id</label>
        <div className='w-max md:w-[500px]'>
          <Select
            defaultValue={`${defaultValuesUser.levelId}`}
            onValueChange={(e: any) => register('levelId').onChange(e)}
          >
            <SelectTrigger
              className='border-[#eee] py-2'
              ref={register('levelId').ref}
            >
              <SelectValue placeholder={'Select Level'} />
            </SelectTrigger>
            <SelectContent>
              {level.map((data: any, ind: number) => (
                <SelectItem
                  key={ind}
                  value={`${data.id}`}
                >
                  {data.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='mb-[10px] md:flex md:items-center md:justify-between'>
        <label htmlFor=''>Photo</label>
        <div className='w-max md:w-[500px]'>
          <Input
            placeholder='Image'
            type='file'
            defaultValue={defaultValuesUser.image}
            // ref={register('image').ref}
            // onChange={(e: any) => register('image').onChange(e?.target.files[0])}
            {...register('image', {})}
          />
          {/* <ControllerInput
            type='file'
            control={control}
            name='Photo'
            title='Photo'
            rules={{}}
          /> */}
        </div>
      </div>
      <div className='flex justify-end'>
        <Button
          className='mt-[20px] '
          type='submit'
        >
          submit
        </Button>
      </div>
    </form>
  );
};

export default EditUserForm;
