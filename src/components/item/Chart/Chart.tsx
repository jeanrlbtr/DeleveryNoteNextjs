'use client';

import React from 'react';
import { AreaChart, Card } from '@tremor/react';

export default function Chart({ dataTotal }: { dataTotal: any }) {
  const data = [
    {
      name: 'Jan',
      Total: 0,
      Cancel: 0,
    },
    {
      name: 'Feb',
      Total: 0,
      Cancel: 0,
    },
    {
      name: 'Mar',
      Total: 0,
      Cancel: 0,
    },
    {
      name: 'Apr',
      Total: 0,
      Cancel: 0,
    },
    {
      name: 'May',
      Total: 0,
      Cancel: 0,
    },
    {
      name: 'Jun',
      Total: 0,
      Cancel: 0,
    },
    {
      name: 'Jul',
      Total: 0,
      Cancel: 0,
    },
    {
      name: 'Aug',
      Total: 0,
      Cancel: 0,
    },
    {
      name: 'Sept',
      Total: 0,
      Cancel: 0,
    },
    {
      name: 'Oct',
      Total: 0,
      Cancel: 0,
    },
    {
      name: 'Nov',
      Total: 0,
      Cancel: 0,
    },
    {
      name: 'Dec',
      Total: 0,
      Cancel: 0,
    },
  ];

  for (let i = 0; i < data.length; i++) {
    dataTotal?.filter((item: any) => {
      if (item.month == i + 1) {
        data[i].Cancel = item.canceled;
        data[i].Total = item.total;
      }
    });
  }
  return (
    <Card>
      <AreaChart
        className='h-[200px] mt-4'
        data={data}
        index='name'
        categories={['Total', 'Cancel']}
        colors={['blue', 'red']}
      />
    </Card>
  );
}
