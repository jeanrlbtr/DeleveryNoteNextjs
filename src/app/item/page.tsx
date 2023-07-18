'use client';

import { Container, ListItem } from '@/components/item';
import React from 'react';

const page = () => {
  return (
    <div className='relative'>
      <Container title='Items'>
        <div className='w-full '>
          <ListItem />
        </div>
      </Container>
    </div>
  );
};

export default page;
