import { Input } from '@/components/ui/input';
import { Controller } from 'react-hook-form';

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

const InputValidation = ({
   control,
   name,
   rules,
   title,
   type,
   ...props
}: InputProps) => {
   return (
      <div>
         <Controller
            defaultValue={props.defaultValue}
            {...props}
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
               return (
                  <>
                     <Input
                        {...field}
                        placeholder={title}
                        type={type}
                        className="w-[500px]"
                     />
                     {/* <span>{errors}</span> */}
                  </>
               );
            }}
         />
      </div>
   );
};

export default InputValidation;
