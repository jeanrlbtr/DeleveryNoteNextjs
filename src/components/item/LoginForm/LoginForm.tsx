'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '../../ui/input';
import { axiosAuth } from '@/lib/api';
import { useState } from 'react';
import { Loader } from 'lucide-react';

interface Data {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const defaultValueUser: Data = {
    username: '',
    password: '',
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValueUser,
  });
  const onSubmit = handleSubmit(async (data: Data) => {
    setLoading(true);
    try {
      const res = await axiosAuth.post('https://dev.saptakarsa.com/gtw/delivery/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      localStorage.setItem('data', JSON.stringify(res.data.data));
      push('/');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  });

  const disable = Object.keys(errors).length !== 0;

  return (
    <form
      className='flex flex-col gap-5 w-[300px]'
      onSubmit={onSubmit}
    >
      <p className='font-Poppins text-[40px] text-[#525252] mx-auto'>Welcome !</p>

      <div className='flex flex-col gap-[4px]'>
        <label className='text-[15px] font-Poppins text-[#525252]'>
          Username
          <span className='text-[red]'>*</span>
        </label>
        <Input
          {...register('username', {
            required: 'username must be required',
          })}
          placeholder='Username'
          type='text'
          className='border-[#afafaf] rounded-[5px] placeholder:text-[gray]'
        />
      </div>
      <div className='flex flex-col gap-[4px]'>
        <label className='text-[15px] font-Poppins text-[#525252]'>
          Password
          <span className='text-[red]'>*</span>
        </label>
        <Input
          {...register('password', {
            required: 'Pasword must be required',
          })}
          placeholder='* * * * *'
          type='password'
          className='border-[#afafaf] rounded-[5px] placeholder:text-[gray]'
        />
      </div>
      <button
        type='submit'
        disabled={disable}
        className={`font-Poppins mt-[6px] p-[3px] flex justify-center text-[17px] w-[200px] rounded-[5px] mx-auto bg-[#2a1246]  ${
          disable ? 'cursor-not-allowed bg-[#eee] text-[gray]' : 'text-[white]'
        }`}
      >
        {loading ? <Loader /> : 'LOGIN'}
      </button>
    </form>
  );
};

export default LoginForm;
