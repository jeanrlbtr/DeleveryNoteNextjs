'use client';

import ShipmentPost from '@/components/item/modal/ShipmentPost';
import { DataTable } from '@/components/table/DataTabel';
import { shipmentColumn } from '@/components/table/columns';
import MutationFetch from '@/hooks/MutationFetch';
import { UseQueryFetching } from '@/hooks/UseQueryFetch';
import { formatDate } from '@/lib/utils';
import { DataShipment, DriverDataT, ShipmentT } from '@/types';
import { ColumnDef, Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import Flatpickr from 'react-flatpickr';
interface ShipmentProps {
   shipment: ShipmentT[];
   driverData: DriverDataT;
}

const Shipment = ({ shipment, driverData }: ShipmentProps) => {
   const [date, setDate] = useState<Date>(new Date());
   // const { date, setDate } = shipmentStore((state) => state);
   const shipmentDate = formatDate(date);

   const { data } = UseQueryFetching<DataShipment>(
      `/delivery/v1/shipments?date=${shipmentDate}`,
      ['shipment', String(date)],
      { data: shipment }
   );

   const { data: driver } = UseQueryFetching<DriverDataT>(
      `/delivery/v1/drivers`,
      ['driver'],
      driverData
   );

   const { mutate } = MutationFetch(['shipment']);

   const handleSaveToll = (id: string, tollTopUp: number) => {
      if (tollTopUp > 0)
         mutate({
            url: `/delivery/v1/shipment/${id}`,
            body: { topupToll: tollTopUp },
            headers: 'json',
            method: 'patch',
         });
   };

   const shipmentData = data?.data || shipment;
   const SelectDriverData = driver?.data;
   const route = useRouter();
   const column: ColumnDef<ShipmentT>[] = [
      ...shipmentColumn,
      {
         header: 'Top Up Toll',
         cell: (row) => {
            let amountToll = row.row.original.topupToll;
            return (
               <div className="flex gap-4">
                  <CurrencyInput
                     defaultValue={amountToll}
                     placeholder="amount"
                     decimalsLimit={2}
                     className="border rounded-md w-[130px] px-2 py-1"
                     prefix="Rp "
                     onValueChange={(value) => {
                        if (value) {
                           // setTollTopup(Number(value));
                           amountToll = Number(value);
                        }
                     }}
                  />
                  <button
                     onClick={() => {
                        handleSaveToll(row.row.original.id, amountToll);
                     }}
                     className="text-white bg-container px-2 py-1 rounded-md"
                  >
                     Save
                  </button>
               </div>
            );
         },
      },
   ];

   return (
      <div className="mt-10">
         <div className="w-full flex justify-between">
            {SelectDriverData && <ShipmentPost driver={SelectDriverData} />}

            <Flatpickr
               value={date}
               options={{
                  altFormat: 'F j, Y',
                  dateFormat: 'Y-m-d',
                  disableMobile: true,
               }}
               className="border rounded-md py-1 px-2 z-50"
               onChange={([e]) => {
                  setDate(e);
               }}
            />
         </div>
         <div className="bg-white px-6 py-3 mt-10 rounded-md">
            <DataTable
               type={'item'}
               columns={column}
               data={shipmentData || []}
               action={true}
            >
               {(row: Row<ShipmentT>) => {
                  return (
                     <button
                        className="bg-container text-white px-2 py-1 rounded-md"
                        onClick={() => {
                           route.push(`/shipment/${row.original?.id}`);
                           localStorage.setItem('shipmentId', row.original?.id);
                        }}
                     >
                        Detail
                     </button>
                  );
               }}
            </DataTable>
         </div>
      </div>
   );
};

export default Shipment;
