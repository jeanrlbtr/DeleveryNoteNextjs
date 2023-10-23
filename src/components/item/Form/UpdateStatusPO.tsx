'use client';

import { Input } from '@/components/ui/input';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import MutationFetch from '@/hooks/MutationFetch';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface DefaulValue {
   status: string;
   note: string;
}
// 'CONFIRM', 'FINISH'
const UpdateStatusPO = ({ no }: { no: string }) => {
   const status = [
      { key: 'CANCELED', title: 'Batalkan' },
      { key: 'CONFIRM', title: 'Konfirmasi' },
      { key: 'FINISH', title: 'Selesai ' },
   ];
   const {
      register,
      setValue,
      formState: { errors },
      handleSubmit,
   } = useForm<DefaulValue>();

   const disable = Object.keys(errors).length > 0;

   const { mutate, isLoading } = MutationFetch(['getDetailNote']);
   return (
      <div className="w-[500px]">
         <p className="text-[20px] text-[#3d3d3d]">Update Status SJ</p>
         <form
            onSubmit={handleSubmit((data) => {
               mutate({
                  body: { ...data, no },
                  url: '/delivery/v1/note',
                  headers: 'json',
                  method: 'patch',
               });
            })}
            className="mt-[20px] flex flex-col gap-[22px]"
         >
            <div>
               <p className="ml-1 text-[#525252] text-[13px] ">
                  Status <span className="text-[red]">*</span>
               </p>
               <Select
                  required
                  onValueChange={(e: string) => setValue('status', e)}
               >
                  <SelectTrigger>
                     <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                     {status.map((data, index) => (
                        <SelectItem value={`${data.key}`} key={index}>
                           {data.title}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>
            <div>
               <p className="ml-1 text-[#525252] text-[13px] ">
                  Note <span className="text-[red]">*</span>
               </p>
               <Input
                  placeholder="Note"
                  {...register('note', {
                     required: 'Note must be required',
                     minLength: 6,
                  })}
               />
            </div>
            <button
               className="w-max bg-container px-2 py-1 text-white rounded-md"
               disabled={disable}
            >
               {isLoading ? <Loader /> : 'Update Status'}
            </button>
         </form>
      </div>
   );
};

export default UpdateStatusPO;
