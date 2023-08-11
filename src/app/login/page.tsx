'use client';
import { LoginForm } from '@/components/item';
import Image from 'next/image';
import React from 'react';

const LoginPage = () => {
   return (
      <div className="h-[100vh] relative">
         {/* <div className='w-[100vw] flex justify-center bg-[#2a1246] h-[60px] absolute top-0'>
        <p className='text-[35px] font-Poppins text-white '> Saptakarsa Prima</p>
      </div> */}
         <div className="h-[100vh] w-[100vw] bg-white flex justify-between">
            <div className="  w-[100vw] md:flex justify-between  bg-[#fff]">
               <p className="w-[10px]" />
               <div className="h-[100vh] flex items-center ">
                  <div className="w-[100vw] mt-[60px] h-[60vh] md:w-[400px] shadow-xl z-[10] rounded-[10px] flex bg-[#fcfcfc]">
                     <div className="mx-auto flex items-center">
                        <LoginForm />
                     </div>
                  </div>
               </div>

               <div className="hidden md:block w-[50vw] h-[100vh] relative">
                  <div className="absolute top-[-80px] right-[50px]">
                     <div className="relative overflow-hidden w-[50vw] h-[100vh]">
                        <Image
                           alt="backgroun"
                           className="object-contain"
                           fill
                           src="/2.png"
                        />
                     </div>
                  </div>
                  <div className="absolute top-[190px] left-[180px]">
                     <div className="w-[500px] h-[400px] relative overflow-hidden ">
                        <Image
                           alt="backgroun"
                           className="object-contain"
                           fill
                           src="/1.png"
                        />
                     </div>
                  </div>
                  <div className="absolute top-[230px] left-[-120px]">
                     <div className="w-[500px] h-[400px] relative overflow-hidden">
                        <Image
                           alt="backgroun"
                           className="object-contain"
                           fill
                           src="/3.png"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
