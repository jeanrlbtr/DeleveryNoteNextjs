import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';

const SelectLimit = ({
   onValueChange,
   limit,
}: {
   onValueChange: any;
   limit: string;
}) => {
   return (
      <Select onValueChange={onValueChange} defaultValue={limit}>
         <SelectTrigger className="w-[60px] p-1 h-max text-[#858585]">
            <SelectValue placeholder="limit" />
         </SelectTrigger>
         <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
         </SelectContent>
      </Select>
   );
};

export default SelectLimit;
