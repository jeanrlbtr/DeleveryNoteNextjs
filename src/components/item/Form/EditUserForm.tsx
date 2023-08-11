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
   username: string;
   autoUpdate: boolean;
   levelId: number;
   password: string;
   image: any;
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
      username: defaultValue?.username,
      password: '',
      isActive: defaultValue?.isActive,
      autoUpdate: defaultValue?.autoUpdate,
      levelId: defaultValue?.levelUser.id,
      image: '',
   };

   const { register, handleSubmit, setValue } = useForm<User>({
      defaultValues: defaultValuesUser,
   });

   const { mutate: editDataUser, isLoading } = MutationFetch(['getUser']);

   const editUser = async (data: any) => {
      const formdata = new FormData();
      for (let i in data) {
         if (data[i]) formdata.set(i, data[i]);
      }
      editDataUser({
         body: formdata,
         method: 'put',
         headers: 'formData',
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
         <div className="mb-[10px] md:flex md:items-center md:justify-between">
            <label htmlFor="">Name</label>
            <div className="w-max md:w-[500px]">
               <Input
                  placeholder="Name"
                  disabled={defaultValuesUser.autoUpdate}
                  defaultValue={defaultValuesUser.name}
                  {...register('name', {})}
               />
            </div>
         </div>
         <div className="mb-[10px] md:flex md:items-center md:justify-between">
            <label htmlFor="">Username</label>
            <div className="w-max md:w-[500px]">
               <Input
                  placeholder="Username"
                  defaultValue={defaultValuesUser.username}
                  disabled={defaultValuesUser.autoUpdate}
                  {...register('username', {})}
               />
            </div>
         </div>
         <div className="mb-[10px] md:flex md:items-center md:justify-between">
            <label htmlFor="">Password</label>
            <div className="w-max md:w-[500px]">
               <Input
                  placeholder="Password"
                  type="password"
                  disabled={defaultValuesUser.autoUpdate}
                  defaultValue={defaultValuesUser.password}
                  {...register('password', {})}
               />
            </div>
         </div>
         <div className="mb-[20px] md:flex md:items-center md:justify-between">
            <label htmlFor="">Is Actived</label>
            <div className="w-max md:w-[500px]">
               <input
                  type="checkbox"
                  disabled={defaultValuesUser.autoUpdate}
                  className="cursor-pointer"
                  {...register('isActive')}
               />
            </div>
         </div>
         <div className="mb-[20px] md:flex md:items-center md:justify-between">
            <label htmlFor="">Auto Update</label>
            <div className="w-max md:w-[500px]">
               <input
                  type="checkbox"
                  className="cursor-pointer"
                  {...register('autoUpdate')}
               />
            </div>
         </div>
         <div className="mb-[10px] md:flex md:items-center md:justify-between">
            <label htmlFor="">Level Id</label>
            <div className="w-max md:w-[500px]">
               <Select
                  disabled={defaultValuesUser.autoUpdate}
                  defaultValue={`${defaultValuesUser.levelId}`}
                  onValueChange={(e: any) => setValue('levelId', e)}
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
         <div className="mb-[10px] md:flex md:items-center md:justify-between">
            <label htmlFor="">Photo</label>
            <div className="w-max md:w-[500px]">
               <Input
                  placeholder="Image"
                  type="file"
                  disabled={defaultValuesUser.autoUpdate}
                  defaultValue={defaultValuesUser.image}
                  {...register('image', {})}
               />
            </div>
         </div>
         <div className="flex justify-end">
            <Button
               className="mt-[20px] bg-submit hover:bg-submit-hover"
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
