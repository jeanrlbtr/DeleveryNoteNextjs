'use client';
import MutationFetch from '@/hooks/MutationFetch';
import { AmountT, AvailT } from '@/types';
import { Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

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
   const { mutate, isLoading } = MutationFetch(['shipmentDetail']);
   const [isClear, setIsClear] = useState(false);
   const [currencyValue, setCurrencyValue] = useState<string>('');
   const [shipmentId, setShipmentId] = useState<string>('');
   const ref = useRef<any>(null);
   const inputRef = useRef<HTMLInputElement | null>(null);

   const handleClear = () => {
      if (ref) {
         ref.current.clearValue();
      }
      if (inputRef.current?.value) {
         console.log('object');
         inputRef.current.value = '0';
      }
   };

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

      handleClear();
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
         <div className="flex flex-col w-full gap-3">
            {amount &&
               amount.map((amountData, index) => {
                  return (
                     <div key={index}>
                        <div className="flex gap-2 items-center">
                           <div className="border-2 rounded-md flex w-full flex-col gap-2 p-1">
                              {amountData.Items &&
                                 amountData.Items.map((item, index) => {
                                    return (
                                       <p
                                          key={index}
                                          className="border text-sm px-1 text-white  font-medium rounded-lg bg-[#B2B0FF]"
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
                     ref={ref}
                     isMulti
                     isClearable={isClear}
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
                  ref={inputRef}
                  required
                  className="border-2 w-[130px] rounded-md p-[5px]"
                  placeholder="amount"
                  prefix="Rp "
                  value={currencyValue}
                  onValueChange={(value) => {
                     value && setValue('amount', Number(value));
                     if (value) setCurrencyValue(value);
                  }}
               />
            </div>
            <div className=" mt-[10px]">
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
