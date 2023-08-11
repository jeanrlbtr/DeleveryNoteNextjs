import { Controller } from 'react-hook-form';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '../../../components/ui/select';

interface InputProps {
   control: any;
   name: string;
   rules: any;
   title: string;
   type: string;
   className?: string;
   level?: any;
   defaultValue?: any;
   onChange?: any;
}

const ControllerSelect = ({
   control,
   name,
   rules,
   title,
   className,
   level,
   type,
}: InputProps) => {
   return (
      <div className={className}>
         {type !== 'feature' && <label htmlFor="">{title}</label>}
         <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
               return (
                  <Select
                     onValueChange={(e) => {
                        field.onChange(e);
                        // onChange(e);
                     }}
                  >
                     <SelectTrigger
                        className={`border-[#eee] text-[#525252] py-2 ${
                           type == 'feature' ? 'w-full' : 'w-[500px]'
                        }`}
                     >
                        <SelectValue placeholder={title} />
                     </SelectTrigger>
                     <SelectContent>
                        {level &&
                           level.map((data: any, ind: number) => (
                              <SelectItem
                                 key={ind}
                                 value={`${
                                    type == 'feature' ? data.feature : data.id
                                 }`}
                              >
                                 {`${
                                    type == 'feature' ? data.feature : data.name
                                 }`}
                              </SelectItem>
                           ))}
                     </SelectContent>
                  </Select>
               );
            }}
         />
      </div>
   );
};

export default ControllerSelect;
