'use client';
import MutationFetch from '@/hooks/MutationFetch';
import { AmountT, AvailT } from '@/types';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

const options = [
   { value: 'chocolate', label: 'item A' },
   { value: 'strawberry', label: 'item B' },
   { value: 'vanilla', label: 'item C' },
   { value: 'vanilla1', label: 'item D' },
   { value: 'vanilla2', label: 'item E' },
];

interface PaymentItemT {
   amount: number;
   itemId: number[];
}

const PaymentForm = ({
   amount,
   avail,
   type,
}: {
   amount: AmountT[];
   avail: AvailT[];
   type: string;
}) => {
   const { mutate } = MutationFetch(['shipmentDetail']);
   const [shipmentId, setShipmentId] = useState<string>('');
   const returnItem = () => {
      return avail.map((data) => {
         return {
            value: data.id,
            label: data.name,
         };
      });
   };

   const { setValue, handleSubmit } = useForm<PaymentItemT>({
      defaultValues: {
         amount: 0,
         itemId: [],
      },
   });
   const handleSubmitPayment = (dataPayment: PaymentItemT) => {
      const body = () => {
         if (type === 'whGate') {
            return {
               whGate: dataPayment,
            };
         }
         if (type === 'porter') {
            return {
               porter: dataPayment,
            };
         }
         if (type === 'parking') {
            return {
               parking: dataPayment,
            };
         }
      };
      mutate({
         url: `/delivery/v1/shipment/${shipmentId}/cost-item`,
         body: body(),
         method: 'post',
         headers: 'json',
      });
   };
   const handleDeleteItem = (itemId: number) => {
      mutate({
         url: `/delivery/v1/shipment/${shipmentId}/cost-item/${itemId}?type=${type}`,
         headers: 'json',
         method: 'delete',
         body: {},
      });
   };

   useEffect(() => {
      const shipmentId = localStorage.getItem('shipmentId') || '';
      setShipmentId(shipmentId);
   }, []);

   return (
      <div className="w-max">
         <div className="flex flex-col w-full gap-1">
            {amount &&
               amount.map((amountData, index) => {
                  return (
                     <div key={index}>
                        <div className="flex gap-2 items-center">
                           <div className="border-2 rounded-md flex flex-wrap w-full gap-2 p-1">
                              {amountData.Items &&
                                 amountData.Items.map((item, index) => {
                                    return (
                                       <p
                                          key={index}
                                          className="border text-sm px-1 text-white font-medium rounded-lg bg-[#B2B0FF]"
                                       >
                                          {item.Item.name}
                                       </p>
                                    );
                                 })}
                           </div>
                           <div className="border-2 rounded-md flex flex-wrap w-full gap-2 px-2 py-[4.7px]">
                              <p className="font-medium text-sm text-gray-700">
                                 Rp {amountData.amount.toLocaleString('id-ID')}
                                 ,00
                              </p>
                           </div>
                           <div>
                              <Trash2
                                 onClick={() => handleDeleteItem(amountData.id)}
                                 className="text-xl cursor-pointer text-red-500"
                              />
                           </div>
                        </div>
                     </div>
                  );
               })}
         </div>
         <form
            onSubmit={handleSubmit((data) => {
               handleSubmitPayment(data);
            })}
            className="border-t w-full mt-4 pt-5"
         >
            <div className=" flex flex-wrap gap-4 w-[360px] items-center">
               <div className="min-w-[200px] max-w-max">
                  <Select
                     required
                     isMulti
                     closeMenuOnSelect={false}
                     options={returnItem()}
                     onChange={(e) => {
                        const arr: number[] = [];
                        e.map((data) => {
                           arr.push(data.value);
                        });
                        setValue('itemId', arr);
                     }}
                  />
               </div>
               <CurrencyInput
                  required
                  className="border-2 w-[130px] rounded-md p-[5px]"
                  placeholder="amount"
                  prefix="Rp "
                  onValueChange={(value) =>
                     value && setValue('amount', Number(value))
                  }
               />
            </div>
            <div className="mt-[10px]">
               <button
                  type="submit"
                  className="bg-container text-white py-1 px-2 rounded-md"
               >
                  save
               </button>
            </div>
         </form>
      </div>
   );
};

export default PaymentForm;
