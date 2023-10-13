'use client';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { Trash2 } from 'lucide-react';

interface TablePoProps {
   dataPo: string[];
   handleDelete: (value: string) => void;
}

const TablePO = ({ dataPo, handleDelete }: TablePoProps) => {
   return (
      <Table className="">
         <TableHeader>
            <TableRow>
               <TableHead>No</TableHead>
               <TableHead>Purchase Order</TableHead>
               <TableHead></TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {dataPo.length > 0 ? (
               dataPo.map((data, index) => {
                  return (
                     <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data}</TableCell>
                        <TableCell className="flex justify-center text-center">
                           <Trash2
                              onClick={() => {
                                 handleDelete(data);
                              }}
                              className="text-red-500 cursor-pointer"
                           />
                        </TableCell>
                     </TableRow>
                  );
               })
            ) : (
               <TableRow>
                  <TableCell colSpan={3} className="text-gray-600 text-center">
                     No results.
                  </TableCell>
               </TableRow>
            )}
         </TableBody>
      </Table>
   );
};

export default TablePO;
