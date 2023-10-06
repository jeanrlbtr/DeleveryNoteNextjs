import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import MutationFetch from '@/hooks/MutationFetch';
import { Users } from '@/lib/types';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface FormT {
   userId: string;
   platNo: string;
}

const AddDriver = ({ allUserData }: { allUserData: Users[] }) => {
   const isLoading = false;
   const { register, handleSubmit, setValue } = useForm<FormT>({
      defaultValues: {
         userId: '',
         platNo: '',
      },
   });
   const { mutate } = MutationFetch(['driver']);
   const handleAddDriver = (data: FormT) => {
      mutate({
         url: '/delivery/v1/driver',
         headers: 'json',
         method: 'post',
         body: data,
      });
   };
   return (
      <Dialog>
         <DialogTrigger>
            <div className="ml-6 cursor-pointer hover:dark:bg-submit-hover bg-container border-dark transition text-white px-3 py-1 rounded-[6px] text-[16px]">
               Add Driver
            </div>
         </DialogTrigger>
         <DialogContent>
            <DialogTitle>Add Driver</DialogTitle>
            <div className="w-[500px] bg-white">
               <form
                  onSubmit={handleSubmit((data) => {
                     handleAddDriver(data);
                  })}
               >
                  <div className="mt-4">
                     <p className="text-sm mb-1 text-gray-600">
                        name <span className="text-red-500">*</span>
                     </p>
                     <Select
                        onValueChange={(e: string) => {
                           setValue('userId', e);
                        }}
                     >
                        <SelectTrigger>
                           <SelectValue placeholder="Select User" />
                        </SelectTrigger>
                        <SelectContent>
                           {allUserData.map((user, index) => {
                              return (
                                 <SelectItem key={index} value={`${user.id}`}>
                                    {user.name}
                                 </SelectItem>
                              );
                           })}
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="mt-4">
                     <p className="text-sm mb-1 text-gray-600">
                        Plat Number <span className="text-red-500">*</span>
                     </p>
                     <Input
                        type="text"
                        placeholder="plat number"
                        {...register('platNo')}
                     />
                  </div>
                  <div className="flex w-full justify-end">
                     <Button
                        className="mt-[20px] w-[110px] dark:bg-submit text-white bg-container border-dark hover:bg-container  hover:dark:bg-submit-hover"
                        type="submit"
                     >
                        {isLoading ? <Loader /> : 'Save'}
                     </Button>
                  </div>
               </form>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default AddDriver;
