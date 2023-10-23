'use client';

import { AreaChart, Card } from '@tremor/react';

export default function Chart({ dataTotal }: { dataTotal: any }) {
   const data = [
      {
         name: 'Jan',
         Total: 0,
         Batal: 0,
      },
      {
         name: 'Feb',
         Total: 0,
         Batal: 0,
      },
      {
         name: 'Mar',
         Total: 0,
         Batal: 0,
      },
      {
         name: 'Apr',
         Total: 0,
         Batal: 0,
      },
      {
         name: 'Mei',
         Total: 0,
         Batal: 0,
      },
      {
         name: 'Jun',
         Total: 0,
         Batal: 0,
      },
      {
         name: 'Jul',
         Total: 0,
         Batal: 0,
      },
      {
         name: 'Agu',
         Total: 0,
         Batal: 0,
      },
      {
         name: 'Sep',
         Total: 0,
         Batal: 0,
      },
      {
         name: 'Okt',
         Total: 0,
         Batal: 0,
      },
      {
         name: 'Nov',
         Total: 0,
         Batal: 0,
      },
      {
         name: 'Des',
         Total: 0,
         Batal: 0,
      },
   ];

   for (let i = 0; i < data.length; i++) {
      dataTotal?.filter((item: any) => {
         if (item.month == i + 1) {
            data[i].Batal = item.canceled;
            data[i].Total = item.total;
         }
      });
   }

   return (
      <Card>
         <AreaChart
            className="h-[200px] mt-2 dark:text-white border-0"
            data={data}
            index="name"
            categories={['Total', 'Batal']}
            colors={['blue', 'red']}
            curveType="monotone"
            showTooltip={true}
         />
      </Card>
   );
}
