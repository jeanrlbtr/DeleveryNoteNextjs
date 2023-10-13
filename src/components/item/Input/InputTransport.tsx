'use client';
import MutationFetch from '@/hooks/MutationFetch';
import { FormEvent, useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

const InputTransport = ({
   title,
   value,
   titleInput,
   type,
}: {
   title: string;
   value: string | number;
   titleInput: string;
   type: string;
}) => {
   const [amount, setAmount] = useState(Number(value));
   const [shipmentId, setShipmentId] = useState<string | null>('');
   const { mutate } = MutationFetch(['shipmentDetail']);
   const handleSubmitAmount = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const body = () => {
         if (type === 'gas') {
            return {
               gas: amount,
            };
         }
         if (type === 'tollBalance') {
            return {
               tollBalance: amount,
            };
         }
      };

      mutate({
         url: `/delivery/v1/shipment/${shipmentId}`,
         body: body(),
         method: 'patch',
         headers: 'json',
      });
   };
   useEffect(() => {
      setShipmentId(localStorage.getItem('shipmentId'));
   }, []);

   return (
      <div className="px-3 w-[322px] bg-white py-3 rounded-[10px] shadow-md">
         <p className="text-gray-700  text-lg font-medium">{title}</p>
         <form className="mt-3" onSubmit={(e) => handleSubmitAmount(e)}>
            <p className="text-gray-600 mb-1 font-medium">{titleInput}</p>
            <div className="flex w-full justify-between items-center gap-3">
               <CurrencyInput
                  defaultValue={amount}
                  placeholder="amount"
                  className="w-full rounded-[7px] text-gray-600 p-1 border outline-none border-[#5c6eaa]"
                  decimalsLimit={2}
                  prefix="Rp "
                  onValueChange={(value) => {
                     if (value) {
                        setAmount(Number(value));
                     }
                  }}
               />
               <button
                  type="submit"
                  className="py-1 px-2 text-white rounded-md bg-container"
               >
                  Save
               </button>
            </div>
         </form>
      </div>
   );
};

export default InputTransport;
