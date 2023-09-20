import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import MutationFetch from '@/hooks/MutationFetch';
import { StatusItem } from '@/types';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface DefaulValue {
   statusId: number;
   note: string;
}

const UpdateItems = ({
   id,
   status: { data },
}: {
   id: string;
   status: StatusItem;
}) => {
   const statusItem = data;
   const {
      register,
      setValue,
      formState: { errors },
      handleSubmit,
   } = useForm<DefaulValue>();

   const disable = Object.keys(errors).length > 0;
   const { mutate, isLoading } = MutationFetch(['getAllItems']);

   return (
      <div className="w-[200px] md:w-[500px]">
         <p className="text-[20px] text-[#3d3d3d]">Update Status PO</p>
         <form
            onSubmit={handleSubmit((data) => {
               mutate({
                  body: { ...data, id: Number(id) },
                  url: '/delivery/v1/note/item',
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
                  onValueChange={(e: string) => setValue('statusId', Number(e))}
               >
                  <SelectTrigger className="border-[1px]">
                     <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                     {statusItem.map((data, index) => (
                        <SelectItem value={`${data.id}`} key={index}>
                           {data.name}
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
                  className="border-[1px]"
                  placeholder="Note"
                  {...register('note', {
                     required: 'Note must be required',
                     minLength: 6,
                  })}
               />
            </div>
            <Button
               type="submit"
               className="w-full bg-[#405189]"
               disabled={disable}
            >
               {isLoading ? <Loader /> : 'Update Status Items'}
            </Button>
         </form>
      </div>
   );
};

export default UpdateItems;
