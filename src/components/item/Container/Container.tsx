import React from 'react';
import Header from '../Header/Header';

const Container = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className='h-full relative'>
      <div className='sticky top-0'>
        <Header title={title} />
      </div>
      <div className='w-[97%] mt-[40px] mx-auto'>{children}</div>
    </div>
  );
};

export default Container;
