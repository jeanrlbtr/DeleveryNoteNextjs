'use client';

import MutationFetch from '@/hooks/MutationFetch';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/ui/input';
import { useToast } from '../../../components/ui/use-toast';

interface Inputs {
   feature: string;
   method: string[];
}
const ModalPageAccess = () => {
   const { toast } = useToast();

   const { register, handleSubmit } = useForm<Inputs>({
      defaultValues: {
         method: [],
         feature: '',
      },
   });

   const { mutate: postFeature, isLoading } = MutationFetch(['getFeature']);

   const handleSubmitFeature = async (data: any) => {
      if (data.method.length > 0 && data.feature) {
         postFeature({
            url: `/delivery/v1/feature`,
            body: data,
            headers: 'json',
            method: 'post',
         });
      } else {
         toast({
            title: 'Cannot Post Features',
            description: 'min have 1 access and features name is required',
            duration: 3000,
         });
      }
   };
   return (
      <form onSubmit={handleSubmit((data) => handleSubmitFeature(data))}>
         <div className="min-w-[250px] h-max shadow-lg rounded-[10px] p-3">
            <div className="flex flex-col gap-[15px] mt-[20px]">
               <Input
                  placeholder="Feature"
                  {...register('feature', {
                     required: 'feature name is required',
                  })}
               />
               <div className="flex items-center space-x-2">
                  <input
                     id="create"
                     type="checkbox"
                     className="w-[15px]  border-[#d1cfcf] accent-checkbox"
                     value={'create'}
                     {...register('method')}
                  />
                  <label
                     htmlFor="create"
                     className="text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                     Create
                  </label>
               </div>
               <div className="flex items-center space-x-2">
                  <input
                     id="update"
                     type="checkbox"
                     className="w-[15px]  border-[#d1cfcf] accent-checkbox"
                     value={'update'}
                     {...register('method')}
                  />
                  <label
                     htmlFor="update"
                     className="text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                     Update
                  </label>
               </div>
               <div className="flex items-center space-x-2">
                  <input
                     id="read"
                     type="checkbox"
                     className="w-[15px]  border-[#d1cfcf] accent-checkbox"
                     value={'read'}
                     {...register('method')}
                  />
                  <label
                     htmlFor="read"
                     className="text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                     Read
                  </label>
               </div>
               <div className="flex items-center space-x-2">
                  <input
                     id="delete"
                     type="checkbox"
                     className="w-[15px]  border-[#d1cfcf] accent-checkbox"
                     value={'delete'}
                     {...register('method')}
                  />
                  <label
                     htmlFor="delete"
                     className="text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                     Delete
                  </label>
               </div>
               <button
                  type="submit"
                  className="h-max px-2 py-1 mt-[5px] bg-container text-[17px] text-white rounded-md hover:dark:bg-submit-hover"
                  disabled={isLoading}
               >
                  {isLoading ? <Loader /> : 'Apply'}
               </button>
            </div>
         </div>
      </form>
   );
};

export default ModalPageAccess;
