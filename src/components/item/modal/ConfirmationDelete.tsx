import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTrigger,
} from '@/components/ui/dialog';
import MutationFetch from '@/hooks/MutationFetch';
import { Eraser } from 'lucide-react';

const ConfirmationDelete = ({
   driverId,
   name,
}: {
   driverId: number;
   name: string;
}) => {
   const { mutate } = MutationFetch(['driver']);
   const handleDeleteDriver = (id: number) => {
      mutate({
         url: `/delivery/v1/driver/${id}`,
         headers: 'json',
         method: 'delete',
         body: {},
      });
   };
   return (
      <Dialog>
         <DialogTrigger>
            <Eraser className="text-[red]" />
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <p className="text-[19px]">Hapus Supir</p>
            </DialogHeader>
            <div className="px-2 ">
               <div className="flex gap-[20px] mb-[10px] text-[#525252]">
                  Apakah anda ingin menghapus Supir {name}?
               </div>
               <div className="w-full flex justify-end mt-[10px]">
                  <Button
                     onClick={() => {
                        handleDeleteDriver(driverId);
                     }}
                     size={'sm'}
                     className="bg-[red] text-[14px] hover:bg-[#f34848]"
                  >
                     Hapus
                  </Button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default ConfirmationDelete;
