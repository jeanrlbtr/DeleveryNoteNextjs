'use client';

const Error = ({ reset }: { error: Error; reset: () => void }) => {
   return (
      <html>
         <body>
            <div>
               <div className="bg-indigo-900 relative overflow-hidden h-screen">
                  <div className="inset-0 bg-black opacity-25 absolute"></div>
                  <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                     <div className="w-full font-mono flex flex-col items-center relative z-10">
                        <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4 uppercase">
                           SOMETHING WHEN WRONG WITH THE SERVER
                        </h1>

                        <p className="font-extrabold text-8xl my-20 text-white animate-bounce">
                           500
                        </p>

                        <button
                           onClick={() => reset()}
                           className="text-[24px] bg-[white] rounded-[12px] px-[20px]"
                        >
                           Try Again
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </body>
      </html>
   );
};

export default Error;
