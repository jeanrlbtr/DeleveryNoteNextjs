'use client';

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import MutationFetch from '@/hooks/MutationFetch';
import ClientFetching from '@/hooks/clientFetching';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import './form.css';

interface User {
   id: string;
   name: string;
   levelId: number;
   isActive: boolean;
}

const UserForm = ({ level }: { level: any[] }) => {
   const axiosAction = ClientFetching();

   const defaultValuesUser: User = {
      id: '',
      name: '',
      levelId: 0,
      isActive: false,
   };

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm<User>({ defaultValues: defaultValuesUser });
   const { mutate: postUser, isLoading } = MutationFetch(['getUser']);
   const addUser = async (data: any) => {
      postUser({
         body: data,
         headers: 'json',
         url: `/delivery/v1/user/register`,
         method: 'post',
      });
   };

   const disable = Object.keys(errors).length > 0;

   const loadOptions = async (inputValue: any) => {
      if (inputValue) {
         const url = `/delivery/v1/employee?name=${inputValue}`;
         return axiosAction.get(url).then((res) => {
            const result = res.data;
            return result;
         });
      }
      return;
   };

   return (
      <form
         onSubmit={handleSubmit((data) => {
            addUser(data);
         })}
         className="md:w-[700px]"
      >
         <div className="mt-3 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
               <label
                  htmlFor="name"
                  className="text-sm dark:text-white text-gray-700"
               >
                  Nama <span className="text-red-700">*</span>
               </label>
               <div className="bg-red-300">
                  <AsyncSelect
                     required
                     styles={{
                        control: (baseStyles) => ({
                           ...baseStyles,
                           borderColor: 'rgb(156 163 175)',
                           borderWidth: '1px',
                           color: 'black',
                        }),
                     }}
                     defaultOptions
                     getOptionLabel={(e: any) => e.full_name}
                     getOptionValue={(e: any) => e.id}
                     cacheOptions
                     loadOptions={loadOptions}
                     onChange={(e: any) => {
                        setValue('name', e.full_name);
                        setValue('id', e.id);
                     }}
                  />
               </div>
            </div>
            <div className="flex w-full gap-5">
               <div className="flex w-full flex-col gap-1">
                  <label
                     htmlFor="name"
                     className="text-sm dark:text-white text-gray-700"
                  >
                     Level Pengguna <span className="text-red-700">*</span>{' '}
                  </label>
                  <Select
                     required
                     onValueChange={(e) => {
                        setValue('levelId', Number(e));
                     }}
                  >
                     <SelectTrigger className="text-black">
                        <SelectValue placeholder="Pilih Level" />
                     </SelectTrigger>
                     <SelectContent>
                        {level.map((data, index) => {
                           return (
                              <SelectItem key={index} value={`${data.id}`}>
                                 {data.name}
                              </SelectItem>
                           );
                        })}
                     </SelectContent>
                  </Select>
               </div>
            </div>
            <div className="flex  gap-5 w-full">
               <div className="flex w-full items-start flex-col gap-2">
                  <label
                     htmlFor="name"
                     className="text-sm dark:text-white text-gray-700"
                  >
                     User Aktif <span className="text-red-700">*</span>
                  </label>
                  <div className="flex gap-2 items-center">
                     {/* <Checkbox
                        onCheckedChange={(e: boolean) => {
                           setValue('isActive', e);
                        }}
                        className="bg-transparent border-gray-400"
                     /> */}
                     <input
                        required
                        type="checkbox"
                        className="cursor-pointer"
                        {...register('isActive')}
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className="flex justify-end">
            <button
               className="mt-[20px] w-[110px] flex justify-center py-1 rounded-md dark:bg-submit text-white bg-container border-dark  hover:dark:bg-submit-hover"
               disabled={disable || isLoading}
            >
               {isLoading ? <Loader /> : 'submit'}
            </button>
         </div>
      </form>
   );
};

export default UserForm;
