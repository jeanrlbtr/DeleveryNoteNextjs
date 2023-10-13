'use client';
import {
   Dialog,
   DialogContent,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const QRScanner = ({ children }: { children: React.ReactNode }) => {
   const [result, setScanResult] = useState<string[]>([]);
   const [open, setOpen] = useState<boolean>(false);
   const handleScanner = (value: string) => {
      const arr = [...result];
      const newArr: string[] = [];
      newArr.push(value);
      setScanResult(newArr);
   };
   return (
      <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
         <DialogTrigger>{children}</DialogTrigger>
         <DialogContent>
            <DialogTitle>Scann QR Code</DialogTitle>
            <div className="w-[50vw] pt-6 flex flex-col justify-between h-[70vh]">
               <div className="flex justify-center w-full gap-5">
                  <QrReader
                     facingMode={'user'}
                     legacyMode={false}
                     onError={(e) => console.log(e)}
                     onScan={(value) => {
                        if (value) {
                           if (!result.includes(value))
                              setScanResult((prev) => [...prev, value]);
                        }
                     }}
                     // chooseDeviceId={()=>selected}
                     style={{ width: '300px' }}
                     className="rounded-2xl overflow-hidden bg-gray-50"
                  />
                  <div>
                     <div className="h-[300px] overflow-auto">
                        <Table className="">
                           <TableHeader>
                              <TableRow>
                                 <TableHead>No</TableHead>
                                 <TableHead>Purchase Order</TableHead>
                                 <TableHead></TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {result.length > 0 ? (
                                 result.map((data, index) => {
                                    return (
                                       <TableRow key={index}>
                                          <TableCell>{index + 1}</TableCell>
                                          <TableCell>{data}</TableCell>
                                          <TableCell className="flex justify-center text-center">
                                             <Trash2
                                                onClick={() => {
                                                   //
                                                }}
                                                className="text-red-500 cursor-pointer"
                                             />
                                          </TableCell>
                                       </TableRow>
                                    );
                                 })
                              ) : (
                                 <TableRow>
                                    <TableCell
                                       colSpan={3}
                                       className="text-gray-600 text-center"
                                    >
                                       No results.
                                    </TableCell>
                                 </TableRow>
                              )}
                           </TableBody>
                        </Table>
                     </div>
                  </div>
               </div>
               <div className="flex mt-5 justify-end gap-4">
                  <button
                     onClick={() => setOpen(false)}
                     className="bg-transparent rounded text-red-500 px-2 py-1"
                  >
                     cancel
                  </button>
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
