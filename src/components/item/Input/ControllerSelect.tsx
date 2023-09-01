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
   level?: any;
   defaultValue?: any;
   onChange?: any;
}

const ControllerSelect = ({
   control,
   name,
   rules,
   title,
   level,
   type,
}: InputProps) => {
   return (
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
                     className={`border-gray-400 border-[1px] text-gray-500 py-2 w-full`}
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
   );
};

export default ControllerSelect;
