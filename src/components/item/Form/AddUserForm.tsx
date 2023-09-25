'use client';

import { Checkbox } from '@/components/ui/checkbox';
import MutationFetch from '@/hooks/MutationFetch';
import ClientFetching from '@/hooks/clientFetching';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { Button } from '../../ui/button';
import ControllerSelect from '../Input/ControllerSelect';
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
      handleSubmit,
      control,
      setValue,
      getValues,
      formState: { errors },
   } = useForm<User>({ defaultValues: defaultValuesUser });
   const { mutate: postUser, isLoading } = MutationFetch(['getUser']);

   const addUser = async (data: any) => {
      const body: any = {};
      for (let i in data) {
         if (data[i]) body[`${i}`] = data[i];
      }
      postUser({
         body,
         headers: 'formData',
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
                  Name <span className="text-red-700">*</span>
                  {!getValues('name') && (
                     <span className="text-red-700 text-xs">
                        (This field cannot be empty)
                     </span>
                  )}
               </label>
               <div className="bg-red-300">
                  <AsyncSelect
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
                     Level User <span className="text-red-700">*</span>{' '}
                     {!getValues('levelId') && (
                        <span className="text-red-700 text-xs">
                           (This field cannot be empty)
                        </span>
                     )}
                  </label>
                  <ControllerSelect
                     control={control}
                     name="level"
                     rules={{ require: true }}
                     title="level"
                     level={level}
                     type="level"
                  />
               </div>
            </div>
            <div className="flex  gap-5 w-full">
               <div className="flex w-full items-start flex-col gap-2">
                  <label
                     htmlFor="name"
                     className="text-sm dark:text-white text-gray-700"
                  >
                     Is Active <span className="text-red-700">*</span>
                     {!getValues('isActive') && (
                        <span className="text-red-700 text-xs">
                           (This field cannot be empty)
                        </span>
                     )}
                  </label>
                  <div className="flex gap-2 items-center">
                     <Checkbox
                        onCheckedChange={(e: boolean) => {
                           setValue('isActive', e);
                        }}
                        className="bg-transparent border-gray-400"
                     />
                     <p className="text-sm font-light">User Not Active</p>
                  </div>
               </div>
            </div>
         </div>
         <div className="flex justify-end">
            <Button
               className="mt-[20px] dark:bg-submit text-white bg-container border-dark  hover:dark:bg-submit-hover"
               type="submit"
               disabled={disable || isLoading}
            >
               {isLoading ? <Loader /> : 'submit'}
            </Button>
         </div>
      </form>
   );
};

export default UserForm;
