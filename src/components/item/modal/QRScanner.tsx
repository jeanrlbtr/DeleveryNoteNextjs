'use client';
import {
   Dialog,
   DialogContent,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { ScanLine } from 'lucide-react';
import React, { useState } from 'react';

const QRScanner = ({ children }: { children: React.ReactNode }) => {
   const [result, setScanResult] = useState();

   // useEffect(() => {
   //    const scanner = new Html5QrcodeScanner(
   //       'reader',
   //       {
   //          qrbox: {
   //             width: 250,
   //             height: 250,
   //          },
   //          fps: 5,
   //       },
   //       false
   //    );

   //    scanner.render(success, error);

   //    function success(result: any) {
   //       scanner.clear();
   //       setScanResult(result);
   //       console.log(result);
   //    }
   //    function error(err: any) {
   //       console.log(err);
   //    }
   // }, []);

   const handleScanner = () => {};
   return (
      <Dialog>
         <DialogTrigger>{children}</DialogTrigger>
         <DialogContent>
            <DialogTitle>Scann QR Code</DialogTitle>
            <div className="w-[50vw] flex flex-col justify-between h-[70vh] ">
               <div className="flex flex-col mt-6 justify-center items-center">
                  <ScanLine className="w-40 h-40" />
                  <div
                     onClick={handleScanner}
                     className="cursor-pointer mt-4 text-gray-600 font-medium border rounded-md px-2"
                  >
                     Scan Now
                  </div>
               </div>
               <div id="reader" />
               {/* <QrReader
                  constraints={{ facingMode: 'user' }}
                  className="w-[300px]"
                  onResult={(result, error) => {
                     console.log(result);
                  }}
               /> */}
               <div className="flex justify-end">
                  <button className="bg-container rounded text-white px-2 py-1">
                     Save PO
                  </button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default QRScanner;
