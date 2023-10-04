'use client';

import {
   Dialog,
   DialogContent,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
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
import { DatePicker } from '@tremor/react';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

interface DefaultValueShipment {
   driverId: string | number;
   shipmentDate: string;
   no: string[];
}

interface ShipmentPostProps {
   driver: DriverT[];
}

const ShipmentPost = ({ driver }: ShipmentPostProps) => {
   const axiosAction = ClientFetching();

   const { handleSubmit, setValue } = useForm<DefaultValueShipment>({
      defaultValues: {
         driverId: '',
         shipmentDate: '',
         no: [''],
      },
   });
   const { mutate } = MutationFetch(['shipment']);
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

   const handlePostShipment = (data: DefaultValueShipment) => {
      mutate({
         url: '/delivery/v1/shipment',
         method: 'post',
         headers: 'json',
         body: {
            shipmentDate: data.shipmentDate,
            driverId: Number(data.driverId),
            no: data.no,
         },
      });
   };

   return (
      <Dialog>
         <DialogTrigger>
            <div className="px-2 py-1 bg-container rounded-md text-white">
               Add Shipment
            </div>
         </DialogTrigger>
         <DialogContent>
            <DialogTitle>Add Shipment</DialogTitle>
            <form
               onSubmit={handleSubmit((data) => {
                  handlePostShipment(data);
               })}
               className="bg-white w-[500px] p-3"
            >
               <div className="flex flex-col gap-1">
                  <p className="text-sm">
                     Driver <span className="text-red-500">*</span>
                  </p>
                  <Select
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

                  <DatePicker
                     placeholder="Select Date"
                     color="lime"
                     className="border border-[#c8c4c4] rounded-[10px]"
                     onValueChange={(e) => {
                        if (e) {
                           const date = new Date(e);
                           const shipmentDate = formatDate(date);
                           setValue('shipmentDate', shipmentDate);
                        }
                     }}
                  />
               </div>
               <div className="flex flex-col bg-white mt-4 gap-1">
                  <p className="text-sm">
                     Date Shipment <span className="text-red-500">*</span>
                  </p>

                  <AsyncSelect
                     isMulti
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
                        const arr: string[] = [];
                        e.map((data: any) => {
                           arr.push(data.no);
                        });

                        setValue('no', arr);
                     }}
                  />
               </div>
               <div className="mt-4 w-full flex justify-end">
                  <button
                     type="submit"
                     className="px-2 py-1 bg-container rounded-md text-white"
                  >
                     Save
                  </button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
};

export default ShipmentPost;
