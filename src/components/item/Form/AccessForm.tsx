import { CanRule } from '@/hooks/Can';
import MutationFetch from '@/hooks/MutationFetch';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/button';

interface Inputs {
   access: string[];
   module: any[];
}

const ModalAccess = ({
   UserAccess,
   userFeature,
   defaultValues,
   handleClose,
}: {
   UserAccess: any;
   userFeature: any;
   defaultValues: any;
   handleClose: () => void;
}) => {
   console.log({ defaultValues, UserAccess, userFeature });
   const { register, handleSubmit } = useForm<Inputs>({
      defaultValues: {
         access: defaultValues.access,
         module: defaultValues.module,
      },
   });
   const Can = CanRule();
   const { mutate: postAcces } = MutationFetch(['getAccess', 'getMe']);
   const applyAccess = async (data: any) => {
      const newArr: any = [];
      data.module.forEach((e: any) => {
         const data = e.split('/');
         newArr.push({ feature: data[0], module: data[1] });
      });

      const moduleData = newArr.reduce((acc: any, item: any) => {
         const { feature, module } = item;
         const existingFeature = acc.find(
            (obj: any) => obj.feature === feature
         );
         if (existingFeature) {
            existingFeature.method.push(module);
         } else {
            acc.push({ feature, method: [module] });
         }
         return acc;
      }, []);
      const body = {
         userId: UserAccess.id,
         access: data.access,
         module: moduleData,
      };
      postAcces({
         url: `/delivery/v1/access`,
         body,
         method: 'post',
         headers: 'json',
      });
      handleClose();
   };

   return (
      <div className="w-full  shadow-lg rounded-[10px] p-3">
         <form
            onSubmit={handleSubmit((data) => {
               applyAccess(data);
            })}
         >
            <div className="">
               <p className="text-[#525252] text-[19px]">Page</p>

               <div className="mt-[13px] grid grid-cols-3 gap-[10px]">
                  <div className="flex items-center space-x-2">
                     <input
                        id="dasboard"
                        type="checkbox"
                        className="w-[15px]  border-[#d1cfcf] accent-checkbox"
                        defaultChecked={
                           UserAccess?.access.find(
                              (item: any) => item == '/'
                           ) === '/'
                        }
                        value={'/'}
                        {...register('access')}
                     />
                     <label
                        htmlFor="dasboard"
                        className="text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                     >
                        Dashboard
                     </label>
                  </div>
                  <div className="flex items-center space-x-2">
                     <input
                        id="notes"
                        type="checkbox"
                        defaultChecked={
                           UserAccess?.access.find(
                              (item: any) => item == 'notes'
                           ) === 'notes'
                        }
                        className="w-[15px]  border-[#d1cfcf] accent-checkbox"
                        value={'notes'}
                        {...register('access')}
                     />
                     <label
                        htmlFor="notes"
                        className="text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                     >
                        Purchase Order
                     </label>
                  </div>
                  <div className="flex items-center space-x-2">
                     <input
                        id="progress"
                        type="checkbox"
                        defaultChecked={
                           UserAccess?.access.find(
                              (item: any) => item == 'progress'
                           ) === 'progress'
                        }
                        className="w-[15px] border-[#d1cfcf] accent-checkbox"
                        value={'progress'}
                        {...register('access')}
                     />
                     <label
                        htmlFor="progress"
                        className="text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                     >
                        Progress Summary
                     </label>
                  </div>
                  <div className="flex items-center space-x-2">
                     <input
                        id="item"
                        type="checkbox"
                        className="w-[15px]  border-[#d1cfcf] accent-checkbox"
                        value={'item'}
                        defaultChecked={
                           UserAccess?.access.find(
                              (item: any) => item == 'item'
                           ) === 'item'
                        }
                        {...register('access')}
                     />
                     <label
                        htmlFor="item"
                        className="text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                     >
                        Item
                     </label>
                  </div>
                  <div className="flex items-center space-x-2">
                     <input
                        id="users"
                        type="checkbox"
                        className="w-[15px]  border-[#d1cfcf] accent-checkbox"
                        defaultChecked={
                           UserAccess?.access.find(
                              (item: any) => item == 'users'
                           ) === 'users'
                        }
                        value={'users'}
                        {...register('access')}
                     />
                     <label
                        htmlFor="users"
                        className="text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                     >
                        Users
                     </label>
                  </div>
                  <div className="flex items-center space-x-2">
                     <input
                        id="level"
                        type="checkbox"
                        className="w-[15px]  border-[#d1cfcf] accent-checkbox"
                        defaultChecked={
                           UserAccess?.access.find(
                              (item: any) => item == 'level'
                           ) === 'level'
                        }
                        value={'level'}
                        {...register('access')}
                     />
                     <label
                        htmlFor="level"
                        className="text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                     >
                        Level
                     </label>
                  </div>
               </div>
            </div>
            <div className="mt-[15px]">
               <p className="text-[#525252] text-[19px] mb-[10px]">
                  User Access
               </p>
               <div className=" flex flex-col gap-[10px]">
                  {userFeature?.data.map((feature: any, i: number) => {
                     return (
                        <div key={i} className="flex flex-col space-x-2">
                           <p className="text-[#525252] text-[18px] capitalize mb-[10px]">
                              {feature.feature}
                           </p>
                           <div className="flex gap-[20px]">
                              {feature.method.map((dt: any, index: number) => {
                                 return (
                                    <div key={index} className="flex gap-[4px]">
                                       <input
                                          id={`${feature.feature}/${dt}`}
                                          type="checkbox"
                                          className="w-[15px]  border-[#d1cfcf]  accent-checkbox"
                                          value={`${feature.feature}/${dt}`}
                                          {...register('module')}
                                       />
                                       <label
                                          htmlFor={`${feature.feature}/${dt}`}
                                          className="capitalize text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                       >
                                          {dt}
                                       </label>
                                    </div>
                                 );
                              })}
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
            <Can I="update" a="access" passThrough>
               {(allow) => (
                  <Button
                     disabled={!allow}
                     type="submit"
                     className="w-full  h-max p-[1px] mt-[40px] disabled:cursor-not-allowed text-[17px] bg-submit hover:bg-submit-hover"
                  >
                     Apply
                  </Button>
               )}
            </Can>
         </form>
      </div>
   );
};

export default ModalAccess;
