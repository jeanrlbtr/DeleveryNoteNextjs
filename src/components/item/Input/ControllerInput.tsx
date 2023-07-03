import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from '../../../components/ui/input';

interface InputProps {
  control: any;
  name: string;
  rules: any;
  title: string;
  type: string;
  className?: string;
  defaultValue?: string;
  errors: any;
}

const ControllerInput = ({ control, name, rules, title, className, errors, type, defaultValue }: InputProps) => {
  const handleChangeFile = (e: any, field: any) => {
    field.onChange(e.target.files[0]);
  };

  return (
    <div className={className}>
      <label htmlFor=''>{title}</label>
      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <>
              {type !== 'file' ? (
                <div className='flex  flex-col text-[red] text-[13px]'>
                  <Input
                    {...field}
                    placeholder={title}
                    type={type}
                    className='w-[500px]'
                  />
                  {errors[name] && <span>{errors[name].message}</span>}
                </div>
              ) : (
                <Input
                  onChange={(e) => handleChangeFile(e, field)}
                  placeholder={title}
                  type={type}
                  className='w-[500px]'
                />
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default ControllerInput;
