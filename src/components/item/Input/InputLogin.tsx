'use client';
import { Controller } from 'react-hook-form';
import { Icon } from '@iconify/react';

interface Props {
   placeholder: string;
   control: any;
   rules: any;
   error: any;
   type: string;
   defaultvalue: any;
   name: string;
   setText: any;
   text: boolean;
}

const LoginInput = ({
   placeholder,
   control,
   rules,
   error,
   type,
   name,
   defaultvalue,
   text,
   setText,
}: Props) => {
   return (
      <div>
         <Controller
            defaultValue={defaultvalue[name]}
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
               return (
                  <>
                     {type === 'text' ? (
                        <div className="w-full border-[#f1f1f1] p-[4px] border-[1px] rounded-[5px] flex justify-between bg-white">
                           <input
                              {...field}
                              type={type}
                              className={'outline-none text-[15px] bg-white '}
                              placeholder={placeholder}
                           />
                        </div>
                     ) : (
                        <>
                           <div className="w-full border-[#f1f1f1] p-[4px] border-[1px] rounded-[5px] flex justify-between bg-white">
                              <input
                                 {...field}
                                 type={!text ? 'text' : 'password'}
                                 placeholder="  * * * * * *"
                                 className="outline-none text-[15px]"
                              />
                              {text ? (
                                 <Icon
                                    icon="jam:eye-close"
                                    className="cursor-pointer"
                                    width={24}
                                    height={24}
                                    color="teal"
                                    onClick={() => setText(!text)}
                                 />
                              ) : (
                                 <Icon
                                    icon="jam:eye"
                                    width={24}
                                    height={24}
                                    color="teal"
                                    onClick={() => setText(!text)}
                                    className="cursor-pointer"
                                 />
                              )}
                           </div>
                        </>
                     )}
                     {error[name] && (
                        <span className="text-[red] text-[14px]">
                           {error[name]?.message}
                        </span>
                     )}
                  </>
               );
            }}
         />
      </div>
   );
};

export default LoginInput;
