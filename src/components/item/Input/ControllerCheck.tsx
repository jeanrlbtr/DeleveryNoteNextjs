import React from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox } from '../../../components/ui/checkbox';

interface InputProps {
  control: any;
  name: string;
  rules: any;
  title: string;
  type: string;
  className?: string;
}

const ControllerCheck = ({ control, name, rules, title, className, type, ...props }: InputProps) => {
  return (
    <div>
      <div className={className}>
        <label htmlFor=''>{title}</label>
        <div className={`${type !== 'feature' && 'w-max md:w-[500px]'}`}>
          <Controller
            {...props}
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
              return (
                <>
                  <Checkbox
                    ref={field.ref}
                    value={field.value}
                    checked={field.value}
                    defaultValue={field.value}
                    onCheckedChange={field.onChange}
                    className=' border-[#cfcfcf]'
                  />
                </>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ControllerCheck;
