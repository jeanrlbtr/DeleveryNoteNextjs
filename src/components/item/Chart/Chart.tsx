'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
    <LineChart
      width={900}
      height={280}
      data={data}
      margin={{
        top: 2,
        right: 20,
        left: 20,
        bottom: 2,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type='monotone'
        dataKey='Total'
        stroke='#8884d8'
        strokeWidth={5}
      />
      <Line
        type='monotone'
        dataKey='Cancel'
        stroke='#82ca9d'
        strokeWidth={2}
        strokeDasharray='3 4 5 2'
      />
    </LineChart>
  );
}
