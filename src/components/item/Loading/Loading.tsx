import React from 'react';

const Loading = () => {
   return (
      <div className="flex relative justify-center w-full ">
         <div className="transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-24 w-24"></div>
         </div>
      </div>
   );
};

export default Loading;
