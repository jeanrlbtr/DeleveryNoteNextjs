'use client';

import { TruckIcon, User, LogOut, FileStack } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
  const route = useRouter();
  const navigate = (url?: any) => {
    route.push(url);
  };
  const logout = () => {
    navigate('/login');
  };
  return (
    <div className='min-h-[100vh] z-10'>
      <div className='mx-auto w-max '>
        <div className='bg-[white] mx-auto border-[white] border-[1.5px]  rounded-full h-[110px] w-[110px] overflow-hidden relative mt-[50px]'>
          <Image
            src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3MzkxODYzOA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
            alt=''
            fill
            className='object-cover'
          />
        </div>
        <div className='mt-4 '>
          <p className='capitalize mx-auto w-max font-Poppins text-[19px] text-[#fff]'>jean butar butar</p>
          <p className='capitalize mx-auto w-max font-Poppins text-[15px] text-[#fff]'>Admin</p>
        </div>
        <div className='mt-12 flex flex-col h-[250px] md:h-[300px] justify-between w-max mx-auto'>
          <div className='flex flex-col gap-[15px]'>
            <div
              onClick={() => navigate('/notes')}
              className='cursor-pointer flex gap-[10px] items-center active:text-red-600  text-[#fff] hover:text-[#c5c5c5]'
            >
              <TruckIcon className='w-[25px] h-[25px]' />
              <p className='capitalize'>purchase order</p>
            </div>
            {/* <div
              onClick={() => navigate('approve')}
              className='cursor-pointer flex gap-[10px] items-center active:text-red-600  text-[#fff] hover:text-[#c5c5c5] '
            >
              <Icon
                icon='ic:round-edit-note'
                className='w-[25px] h-[25px]'
              />
              <p className='capitalize'>Approve</p>
            </div>
            <div
              onClick={() => navigate('profile')}
              className='cursor-pointer flex gap-[10px] items-center active:text-red-600  text-[#fff] hover:text-[#c5c5c5] '
            >
              <Icon
                icon='iconamoon:profile-light'
                className='w-[25px] h-[25px]'
              />
              <p className='capitalize  '>Profile</p>
            </div> */}
            <div
              onClick={() => navigate('users')}
              className='cursor-pointer flex gap-[10px] items-center active:text-red-600  text-[#fff] hover:text-[#c5c5c5] '
            >
              <User className='w-[25px] h-[25px]' />
              <p className='capitalize'>Users</p>
            </div>
            <div
              onClick={() => navigate('level')}
              className='cursor-pointer flex gap-[10px] items-center active:text-red-600  text-[#fff] hover:text-[#c5c5c5] '
            >
              {/* <Icon
                icon='icon-park-outline:level'
                className='w-[25px] h-[25px]'
              /> */}
              <FileStack />
              <p className='capitalize  '>Level</p>
            </div>
          </div>
          <div
            onClick={() => logout()}
            className='cursor-pointer flex gap-[10px] active:text-red-600 items-center text-[#fff] hover:text-[#c5c5c5] '
          >
            <LogOut className='w-[25px] h-[25px]' />
            <p className='capitalize '>logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
