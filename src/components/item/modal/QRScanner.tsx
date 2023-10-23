'use client';

import {
   Dialog,
   DialogContent,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import ClientFetching from '@/hooks/clientFetching';
import { useState } from 'react';
import QrReader from 'react-qr-reader';
import AsyncSelect from 'react-select/async';
import TablePO from '../Table/TablePO';

const QRScanner = ({
   disabled,
   handleSave,
}: {
   disabled: boolean;
   handleSave: () => void;
}) => {
   const [result, setScanResult] = useState<string[]>([]);
   const [open, setOpen] = useState<boolean>(false);
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
   const handleDelete = (value: string) => {
      const updatePo = result.filter((item) => item !== value);
      setScanResult(updatePo);
   };

   return (
      <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
         <DialogTrigger disabled={disabled}>
            <div
               className={` px-2 py-[6px] text-white rounded-md ${
                  disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-container'
               }`}
            >
               Tambah Surat Jalan
            </div>
         </DialogTrigger>
         <DialogContent>
            <DialogTitle>Tambah Surat jalan</DialogTitle>
            <div className="w-[50vw] pt-6 flex flex-col justify-between min-h-[70vh]">
               <div className="flex justify-between w-full gap-10">
                  <div className="flex flex-col-reverse gap-5">
                     <div>
                        <p className="text-base text-gray-600">
                           scan surat jalan
                        </p>
                        <QrReader
                           facingMode={'user'}
                           legacyMode={false}
                           onError={(e) => console.log(e)}
                           onScan={(value) => {
                              if (value) {
                                 if (!result.includes(value))
                                    setScanResult((prev) => [...prev, value]);
                              }
                           }}
                           style={{ width: '300px' }}
                           className="rounded-lg overflow-hidden bg-gray-50"
                        />
                     </div>
                     <div className="min-w-[200px]">
                        <p className="text-base text-gray-600">
                           pilih surat jalan
                        </p>
                        <AsyncSelect
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
                              if (!result.includes(e.no)) {
                                 setScanResult((prev) => [...prev, e.no]);
                              }
                           }}
                           className="z-50"
                        />
                     </div>
                  </div>
                  <div className="h-[300px] flex-1 w-full overflow-auto">
                     <TablePO dataPo={result} handleDelete={handleDelete} />
                  </div>
               </div>
               <div className="flex mt-5 justify-end gap-4">
                  <button
                     onClick={() => setOpen(false)}
                     className="bg-transparent rounded text-red-500 px-2 py-1"
                  >
                     cancel
                  </button>
                  <button className="bg-container rounded text-white px-2 py-1">
                     Save PO
                  </button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default QRScanner;
