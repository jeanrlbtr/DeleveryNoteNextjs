import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import MutationFetch from '@/hooks/MutationFetch';
import { Edit, Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface FormT {
   platNo: string;
}

const EditDriver = ({
   platNo,
   driverId,
}: {
   platNo: string;
   driverId: string;
}) => {
   const { register, handleSubmit } = useForm<FormT>({
      defaultValues: {
         platNo: platNo,
      },
   });
   const { mutate, isLoading } = MutationFetch(['driver']);
   const handleAddDriver = (data: FormT) => {
      mutate({
         url: '/delivery/v1/driver/' + driverId,
         headers: 'json',
         method: 'put',
         body: data,
      });
   };
   return (
      <Dialog>
         <DialogTrigger>
            <Edit className="text-[green]" />
         </DialogTrigger>
         <DialogContent>
            <DialogTitle>Edit Supir</DialogTitle>
            <div className="w-[500px] bg-white">
               <form
                  onSubmit={handleSubmit((data) => {
                     handleAddDriver(data);
                  })}
               >
                  <div className="mt-4">
                     <p className="text-sm mb-1 text-gray-600">
                        Nomor Plat <span className="text-red-500">*</span>
                     </p>
                     <Input
                        defaultValue={platNo}
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
                        {isLoading ? <Loader /> : 'Submit'}
                     </Button>
                  </div>
               </form>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default EditDriver;
