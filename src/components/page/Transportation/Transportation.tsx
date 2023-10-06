'use client';

import PaymentForm from '@/components/item/Form/PaymentForm';
import InputTransport from '@/components/item/Input/InputTransport';
import QRScanner from '@/components/item/modal/QRScanner';
import { DataTable } from '@/components/table/DataTabel';
import { tollPaymentColumn } from '@/components/table/columns';
import MutationFetch from '@/hooks/MutationFetch';
import { UseQueryFetching } from '@/hooks/UseQueryFetch';
import ClientFetching from '@/hooks/clientFetching';
import { DetailShipmentT, TollMetaT, TollPaymentT } from '@/types';
import { Row } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

interface TollpaymentT {
   amount: number | string;
   time: string;
   gate: string;
}

interface DetailProps {
   shipmentDetail: DetailShipmentT;
}

const Transportation = ({ shipmentDetail }: DetailProps) => {
   const [purchaseOrder, setPurchaseOrder] = useState<string[]>([]);
   const axiosAction = ClientFetching();
   const loadOptions = async (inputValue: string) => {
      if (inputValue) {
         const url = `/delivery/v1/notes?k=noSearch&limit=10&page=1&v=${inputValue}`;
         return axiosAction.get(url).then((res) => {
            const result = res.data.data.notes;
            return result;
         });
      }
      return;
   };
   const { data } = UseQueryFetching(
      `/delivery/v1/shipment/${shipmentDetail.data.id}`,
      ['shipmentDetail'],
      shipmentDetail
   );
   const dataShipmentDetail = data?.data || shipmentDetail.data;
   const { mutate } = MutationFetch(['shipmentDetail']);
   const { register, handleSubmit, setValue } = useForm<TollPaymentT>({
      defaultValues: {
         amount: '',
         time: '',
         gate: '',
      },
   });
   const onSubmitToll = (data: TollpaymentT) => {
      mutate({
         url: `/delivery/v1/shipment/${dataShipmentDetail.id}/cost-item`,
         method: 'post',
         headers: 'json',
         body: {
            toll: {
               gate: data.gate,
               amount: Number(data.amount),
               time: `${data.time}:00`,
            },
         },
      });
   };
   const handleDeleteToll = (tollId: number) => {
      mutate({
         url: `/delivery/v1/shipment/${dataShipmentDetail.id}/cost-item/${tollId}?type=toll`,
         method: 'delete',
         headers: 'json',
         body: {},
      });
   };
   const handleAddPO = () => {
      mutate({
         method: 'patch',
         url: `/delivery/v1/shipment/${dataShipmentDetail.id}`,
         headers: 'json',
         body: { no: purchaseOrder },
      });
   };
   return (
      <div className="mt-8">
         {/* <div className="relative flex gap-4 items-start w-full">
            <p className="flex cursor-pointer items-center text-gray-600 gap-2 pb-2 font-medium text-lg">
               <Building />
               Data Transportation
            </p>
            <p className="flex items-center cursor-pointer text-[#1451AD] gap-2 border-[#1451AD] pb-2 z-10 border-b-4 w-max font-medium text-lg">
               <FolderEdit />
               Edit Transportation
            </p>
            <div className="absolute bottom-0 w-full border-b-4"></div>
         </div> */}

         <div className="pt-4">
            <div className=" mb-5 flex justify-between w-full items-center">
               <div className="flex gap-5">
                  <div className="min-w-[200px]">
                     <AsyncSelect
                        isMulti
                        styles={{
                           control: (baseStyles) => ({
                              ...baseStyles,
                              borderColor: 'rgb(156 163 175)',
                              borderWidth: '1px',
                              color: 'black',
                           }),
                        }}
                        defaultOptions
                        getOptionLabel={(e: any) => e.no}
                        getOptionValue={(e: any) => e.no}
                        cacheOptions
                        loadOptions={loadOptions}
                        onChange={(e: any) => {
                           const arr: string[] = [];
                           e.map((data: any) => {
                              arr.push(data.no);
                           });

                           setPurchaseOrder(arr);
                        }}
                     />
                  </div>
                  <button
                     onClick={handleAddPO}
                     className="bg-container px-2 py-[6px] text-white rounded-md"
                  >
                     Save
                  </button>
               </div>
               <div>
                  <QRScanner>
                     <div className="bg-container px-2 py-[6px] text-white rounded-md">
                        Add PO with QR
                     </div>
                  </QRScanner>
               </div>
            </div>
            <div className="flex items-center gap-9">
               <InputTransport
                  title="Gas Payment"
                  titleInput="Amount"
                  value={dataShipmentDetail.gas}
                  type="gas"
               />
               <InputTransport
                  title="Travel Expense"
                  titleInput="Toll Balance"
                  value={dataShipmentDetail.tollBalance}
                  type="tollBalance"
               />
            </div>
         </div>
         <div className=" mt-5 flex gap-4">
            <div className="px-1 rounded-lg py-3 flex-[4] shadow-md bg-white">
               <p className="px-2 mb-4 font-medium text-lg text-gray-600">
                  Toll Payment
               </p>
               <DataTable
                  columns={tollPaymentColumn}
                  hiddenFooter={true}
                  data={dataShipmentDetail.tollMeta}
                  type={'item'}
                  action={true}
               >
                  {(row: Row<TollMetaT>) => {
                     return (
                        <Trash2
                           onClick={() => handleDeleteToll(row.original.id)}
                           className="text-xl ml-4 cursor-pointer text-red-500"
                        />
                     );
                  }}
               </DataTable>
               <div>
                  <form
                     onSubmit={handleSubmit((data) => {
                        onSubmitToll(data);
                     })}
                     className="flex px-5 w-full gap-8 mt-5 items-center"
                  >
                     <input
                        type="text"
                        placeholder="Tol name"
                        className="border p-2 rounded-md"
                        required
                        {...register('gate')}
                     />
                     <CurrencyInput
                        required
                        {...register('amount')}
                        onValueChange={(value) =>
                           value && setValue('amount', value)
                        }
                        className="border p-2 rounded-[5px]"
                        placeholder="amount"
                        prefix="Rp "
                     />
                     <input
                        required
                        type="time"
                        {...register('time')}
                        placeholder="Time"
                        className="border p-1 "
                     />
                     <button
                        type="submit"
                        className="bg-container text-white px-3 py-1 rounded-md"
                     >
                        save
                     </button>
                  </form>
               </div>
            </div>
            <div className="flex-1 bg-white shadow-md px-2 rounded-md py-3">
               <p className="text-gray-600 text-lg font-medium">
                  Customer info
               </p>
               {dataShipmentDetail.customer.map((data, index) => {
                  return (
                     <div
                        key={index}
                        className="flex items-center gap-4 mt-4 border-b py-3 w-full bg-blue-100 px-2 border-l-2 border-l-cyan-900 rounded-lg"
                     >
                        <div className="text-gray-600 font-medium">
                           {index + 1}.
                        </div>
                        <div>
                           <p className="font-medium text-gray-700">
                              {data.Inv.recipientName}
                           </p>
                           <p className="text-xs text-gray-600">
                              {data.Inv.no}
                           </p>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
         <div className="px-3 py-2 pb-10 mt-5 bg-white rounded-md shadow-md">
            <p className="font-medium text-lg text-gray-600">Item Payment</p>
            <div className="mt-4 flex justify-between">
               <div>
                  <p className="font-medium text-gray-600 text-base">
                     Parking amount
                  </p>
                  <div className="mt-3 ">
                     <PaymentForm
                        type="parking"
                        avail={dataShipmentDetail.parkingMeta.avail}
                        amount={dataShipmentDetail.parkingMeta.amount}
                     />
                  </div>
               </div>
               <div>
                  <p className="font-medium text-gray-600 text-base">
                     Warehouse Parking
                  </p>
                  <div className="mt-3">
                     <PaymentForm
                        type="whGate"
                        amount={dataShipmentDetail.whGateMeta.amount}
                        avail={dataShipmentDetail.whGateMeta.avail}
                     />
                  </div>
               </div>
               <div>
                  <p className="font-medium text-gray-600 text-base">
                     Porter amount
                  </p>
                  <div className="mt-3">
                     <PaymentForm
                        type="porter"
                        amount={dataShipmentDetail.porterMeta.amount}
                        avail={dataShipmentDetail.porterMeta.avail}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Transportation;
