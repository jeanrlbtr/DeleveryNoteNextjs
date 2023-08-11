import { Controller } from 'react-hook-form';
import { Input } from '../../../components/ui/input';
import { Checkbox } from '../../../components/ui/checkbox';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '../../../components/ui/select';
interface Props {
   placeholder: string;
   control: any;
   rules: any;
   error: any;
   type: string;
   input: string;
   defaultvalue: any;
   name: string;
   level: any[];
}

const CustomInput = ({
   placeholder,
   control,
   rules,
   error,
   type,
   input,
   name,
   defaultvalue,
   level,
}: Props) => {
   const handleChange = (e: any, field: any) => {
      if (type == 'file') field.onChange(e?.target.files[0]);
      field.onChange;
   };
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
                     {type === 'checkbox' && (
                        <Checkbox
                           checked={field.value}
                           defaultValue={field.value}
                           onCheckedChange={field.onChange}
                           className="my-[8px] border-[#cfcfcf]"
                        />
                     )}
                     {input === 'name' && (
                        <>
                           <Input
                              {...field}
                              type={type}
                              className={`${
                                 error[name] && 'border-[red] '
                              } w-full`}
                              placeholder={placeholder}
                           />
                           {error[name] && (
                              <span className="text-[red] text-[14px]">
                                 {error[name]?.message}
                              </span>
                           )}
                        </>
                     )}
                     {input === 'input' && (
                        <>
                           <Input
                              onChange={(e) => {
                                 handleChange(e, field);
                              }}
                              type={type}
                              className={`${
                                 error[name] && 'border-[red] '
                              } w-full`}
                              placeholder={placeholder}
                           />
                           {error[name] && (
                              <span className="text-[red] text-[14px]">
                                 {error[name]?.message}
                              </span>
                           )}
                        </>
                     )}
                     {type === 'select' && (
                        <Select
                           onValueChange={field.onChange}
                           defaultValue={`${field.value}`}
                        >
                           <SelectTrigger className="border-[#eee] py-2">
                              <SelectValue placeholder={placeholder} />
                           </SelectTrigger>
                           <SelectContent>
                              {level.map((data, ind) => (
                                 <SelectItem key={ind} value={`${data.id}`}>
                                    {data.name}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     )}
                  </>
               );
            }}
         />
      </div>
   );
};

export default CustomInput;
