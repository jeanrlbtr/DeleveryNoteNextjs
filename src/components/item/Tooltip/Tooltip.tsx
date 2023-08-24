import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import React from 'react';

const TooltipComponent = ({
   children,
   title,
}: {
   children: React.ReactNode;
   title: string;
}) => {
   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger>{children}</TooltipTrigger>
            <TooltipContent className="bg-[#5C6EAA] border-0">
               <p className="text-[white]">{title}</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};

export default TooltipComponent;
