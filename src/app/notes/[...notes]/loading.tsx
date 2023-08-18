import { TextAlignLeftIcon } from '@radix-ui/react-icons';

const Loading = () => {
   return (
      <div>
         <div className='className="max-w-screen bg-[#405189] flex justify-between md:px-8 px-4 pt-4 pb-3 shadow'>
            <TextAlignLeftIcon className="text-[#fafafa] w-[25px] h-[25px] cursor-pointer md:w-[30px] md:h-[30px]" />
            <p className="text-[17px] md:text-[25px] font-[600] text-[#fff]">
               Loading...
            </p>
         </div>
      </div>
   );
};

export default Loading;
