import { FC } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   statusItem: {
      name: string;
      key?: string;
      id?: number;
   };
   statusValue: string | number;
}

const ButtonTabs: FC<Props> = ({ statusItem, statusValue }: Props) => {
   return (
      <button
         className={`px-[8px] transition ${
            statusValue == statusItem.key
               ? 'bg-[#071952] dark:bg-blue-600 text-white'
               : 'text-[#807f7f] hover:dark:bg-blue-400 hover:bg-[#2b3557] hover:text-white'
         } py-[8px] lg:text-[16px]`}
      >
         {statusItem.name}
      </button>
   );
};

export default ButtonTabs;
