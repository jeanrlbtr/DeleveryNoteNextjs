'use client';

import MutationFetch from '@/hooks/MutationFetch';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '../../../components/ui/select';

interface User {
   name: string;
   levelId: number;
   isActive: boolean;
}

const EditUserForm = ({
   defaultValue,
   level,
}: {
   defaultValue?: any;
   level: any[];
}) => {
   const defaultValuesUser = {
      name: defaultValue?.name,
      isActive: defaultValue?.isActive,
      levelId: defaultValue?.levelUser.id,
   };

   const { register, handleSubmit, setValue } = useForm<User>({
      defaultValues: defaultValuesUser,
   });

   const { mutate: editDataUser, isLoading } = MutationFetch(['getUser']);

   const editUser = async (data: User) => {
      editDataUser({
         body: data,
         method: 'put',
         headers: 'json',
         url: `/delivery/v1/user/${defaultValue.id}`,
      });
   };

   return (
      <form
         onSubmit={handleSubmit((data) => {
            editUser(data);
         })}
         className="md:w-[700px]"
      >
         <div className="mb-[10px]">
            <label htmlFor="name">Name</label>
            <div className="w-full">
               <Input
                  id="name"
                  placeholder="Name"
                  defaultValue={defaultValuesUser.name}
                  {...register('name', {})}
               />
            </div>
         </div>
         <div className="mb-[10px]">
            <label htmlFor="">Level Id</label>
            <div className="w-full">
               <Select
                  defaultValue={`${defaultValuesUser.levelId}`}
                  onValueChange={(e: string) => setValue('levelId', Number(e))}
               >
                  <SelectTrigger
                     className="border-[#eee] py-2"
                     ref={register('levelId').ref}
                  >
                     <SelectValue placeholder={'Select Level'} />
                  </SelectTrigger>
                  <SelectContent>
                     {level.map((data: any, ind: number) => (
                        <SelectItem key={ind} value={`${data.id}`}>
                           {data.name}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>
         </div>
         <div className="mb-[20px]">
            <label htmlFor="">Is Actived</label>
            <div className="w-full">
               <input
                  type="checkbox"
                  className="cursor-pointer"
                  {...register('isActive')}
               />
            </div>
         </div>
         <div className="flex justify-end">
            <Button
               className="mt-[20px] w-[110px] dark:bg-submit  bg-container border-dark  hover:dark:bg-submit-hover"
               type="submit"
               disabled={isLoading}
            >
               {isLoading ? <Loader /> : 'submit'}
            </Button>
         </div>
      </form>
   );
};

export default EditUserForm;
