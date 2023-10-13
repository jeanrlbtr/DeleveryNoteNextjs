'use client';

import { Calendar } from '@/components/ui/calendar';
import {
   Dialog,
   DialogContent,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import MutationFetch from '@/hooks/MutationFetch';
import ClientFetching from '@/hooks/clientFetching';
import { formatDate } from '@/lib/utils';
import { DriverT } from '@/types';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import QrReader from 'react-qr-reader';
import AsyncSelect from 'react-select/async';
import TablePO from '../Table/TablePO';

interface DefaultValueShipment {
   driverId: string | number;
   shipmentDate: string;
}

interface ShipmentPostProps {
   driver: DriverT[];
}

const ShipmentPost = ({ driver }: ShipmentPostProps) => {
   const [dataPo, setDataPo] = useState<string[]>([]);
   const axiosAction = ClientFetching();
   const [open, setOpen] = useState(false);
   const [date, setDate] = useState(new Date());
   const [type, setType] = useState<string>('qr');
   const { handleSubmit, setValue } = useForm<DefaultValueShipment>({
      defaultValues: {
         driverId: '',
         shipmentDate: '',
      },
   });
   const ref = useRef<any>(null);

   const { mutate } = MutationFetch(['shipment']);
   const loadOptions = async (inputValue: string) => {
      if (inputValue) {
         const url = `/delivery/v1/notes?k=noSearch&limit=10&page=1&v=${inputValue}`;
         // console.log('object');
         const res = await axiosAction.get(url);
         const result = res.data.data.notes;
         const filterResult = result.filter((item: any) => {
            if (!dataPo.includes(item.no)) {
               return item;
            }
         });
         return filterResult;
      }
   };

   const handlePostShipment = (data: DefaultValueShipment) => {
      mutate({
         url: '/delivery/v1/shipment',
         method: 'post',
         headers: 'json',
         body: {
            shipmentDate: data.shipmentDate,
            driverId: Number(data.driverId),
            no: [dataPo],
         },
      });
      setOpen(false);
   };
   const handleDelete = (value: string) => {
      const updatePo = dataPo.filter((item) => item !== value);
      setDataPo(updatePo);
   };
   return (
      <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
         <DialogTrigger>
            <div className="px-2 py-1 bg-container rounded-md text-white">
               Add Shipment
            </div>
         </DialogTrigger>
         <DialogContent>
            <DialogTitle>Add Shipment</DialogTitle>
            <div className="flex justify-end px-3">
               <Select defaultValue="qr" onValueChange={(e) => setType(e)}>
                  <SelectTrigger className="w-[200px]">
                     <SelectValue placeholder={'Select Type'} />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="select">Po with Select</SelectItem>
                     <SelectItem value="qr">Po with Qr</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="flex justify-between  gap-5">
               <form
                  onSubmit={handleSubmit((data) => {
                     handlePostShipment(data);
                  })}
                  className="bg-white w-[400px] px-3"
               >
                  <div className="flex flex-col gap-1">
                     <p className="text-sm">
                        Driver <span className="text-red-500">*</span>
                     </p>
                     <Select
                        required
                        onValueChange={(value) => {
                           setValue('driverId', value);
                        }}
                     >
                        <SelectTrigger className="border border-[#c8c4c4] shadow-sm">
                           <SelectValue placeholder="Select Driver" />
                        </SelectTrigger>
                        <SelectContent>
                           {driver.map((driver, index) => {
                              return (
                                 <SelectItem key={index} value={`${driver.id}`}>
                                    {driver?.User?.name}
                                 </SelectItem>
                              );
                           })}
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="flex flex-col bg-white mt-4 gap-1">
                     <p className="text-sm">
                        Date Shipment <span className="text-red-500">*</span>
                     </p>
                     <Popover>
                        <PopoverTrigger asChild>
                           <div className="flex items-center gap-4 border rounded-lg py-[10px] px-2">
                              <p className="text-sm">
                                 {date.toLocaleDateString()}
                              </p>
                           </div>
                        </PopoverTrigger>
                        <PopoverContent align="end">
                           <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(e) => {
                                 if (e) {
                                    const date = new Date(e);
                                    const shipmentDate = formatDate(date);
                                    setDate(e);
                                    setValue('shipmentDate', shipmentDate);
                                 }
                              }}
                              className="rounded-md"
                           />
                        </PopoverContent>
                     </Popover>
                  </div>
                  <div className=" h-[200px] overflow-auto mt-4">
                     <TablePO handleDelete={handleDelete} dataPo={dataPo} />
                  </div>
               </form>

               <div className="w-[350px]">
                  {type === 'select' && (
                     <div className="flex flex-col bg-white gap-1">
                        <p className="text-sm">
                           Purchase Order{' '}
                           <span className="text-red-500">*</span>
                        </p>
                        <div className="flex flex-col gap-4 w-full">
                           <AsyncSelect
                              required
                              className="w-full"
                              ref={ref}
                              styles={{
                                 control: (baseStyles) => ({
                                    ...baseStyles,
                                    borderColor: '#c8c4c4',
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
                                 if (!dataPo.includes(e.no)) {
                                    setDataPo((prev) => [...prev, e.no]);
                                 }
                              }}
                           />
                        </div>
                     </div>
                  )}
                  {type === 'qr' && (
                     <>
                        <div className="flex flex-col items-end bg-white gap-1">
                           <div>
                              <p className="text-sm mb-1">
                                 Qr Purchase Order{' '}
                                 <span className="text-red-500">*</span>
                              </p>
                              <div className="flex gap-5">
                                 <QrReader
                                    facingMode={'user'}
                                    legacyMode={false}
                                    onError={(e) => console.log(e)}
                                    onScan={(value) => {
                                       if (value) {
                                          if (!dataPo.includes(value))
                                             setDataPo((prev) => [
                                                ...prev,
                                                value,
                                             ]);
                                       }
                                    }}
                                    style={{ width: '300px' }}
                                    className="rounded-2xl overflow-hidden bg-gray-50"
                                 />
                              </div>
                           </div>
                        </div>
                     </>
                  )}
               </div>
            </div>
            <div className="mt-4 w-full flex gap-2 justify-end">
               <button
                  type="submit"
                  disabled={dataPo.length == 0}
                  className="px-2 py-1 bg-[#186F65] rounded-md text-white disabled:bg-slate-500 disabled:cursor-not-allowed"
               >
                  Save and close
               </button>
               <button
                  disabled={dataPo.length == 0}
                  type="submit"
                  className="px-2 py-1 disabled:bg-slate-500 disabled:cursor-not-allowed bg-container rounded-md text-white"
               >
                  Save and go
               </button>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default ShipmentPost;
