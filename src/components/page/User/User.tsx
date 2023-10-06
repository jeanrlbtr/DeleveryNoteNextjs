'use client';

import ModalAccess from '@/components/item/Form/AccessForm';
import UserForm from '@/components/item/Form/AddUserForm';
import EditUserForm from '@/components/item/Form/EditUserForm';
import ModalPageAccess from '@/components/item/Form/PageAccessForm';
import { DataTable } from '@/components/table/DataTabel';
import TableLoading from '@/components/table/TableLoading';
import { userColumn } from '@/components/table/columns';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { CanRule } from '@/hooks/Can';
import ClientFetching from '@/hooks/clientFetching';
import { Users } from '@/lib/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { Edit, Eraser, FolderLock } from 'lucide-react';
import { useState } from 'react';

const User = () => {
   const { toast } = useToast();
   const queryClient = useQueryClient();
   const [detailAccess, setDetailAccess] = useState<string>('');
   const fetchingUser = ClientFetching();
   const [open, setOpen] = useState<boolean>(false);
   const [openDelete, setOpenDelete] = useState<boolean>(false);
   const Can = CanRule();
   const [defaultValues, setDefaultValues] = useState({
      access: [],
      module: [],
   });

   const { data: userFeature } = useQuery({
      queryFn: async () => {
         const res = await fetchingUser.get(`/delivery/v1/feature`);
         return res.data;
      },
      queryKey: ['getFeature'],
   });

   const { data: level, isLoading: isLoadingLevel } = useQuery({
      queryKey: ['getLevel'],
      queryFn: async () => {
         const res = await fetchingUser.get('/delivery/v1/levels');
         return res.data.data;
      },
   });

   const { data: user, isLoading: isLoadingUser } = useQuery({
      queryKey: ['getUser'],
      queryFn: async () => {
         const res = await fetchingUser.get('/delivery/v1/users');
         return res.data.data;
      },
   });
   const { mutate: postUser } = useMutation({
      mutationFn: async (id: string) => {
         const res = await fetchingUser.delete(`/delivery/v1/user/${id}`, {
            headers: {
               'Content-Type': 'multipart/json',
            },
         });
         return res.data;
      },
      onSuccess: (res) => {
         toast({
            title: res.message,
            duration: 3000,
         });
         return queryClient.invalidateQueries({ queryKey: ['getUser'] });
      },
      onError: (error: any) => {
         if (error?.response) {
            toast({
               title: error.response.data.message,
               duration: 3000,
            });
         }
      },
   });

   const handleCloseAccess = () => {
      setOpen(false);
   };
   if (isLoadingLevel || isLoadingUser) {
      return <TableLoading />;
   }

   return (
      <div className="">
         <div className="dark:bg-container bg-white w-full px-[20px] overflow-auto pt-[30px] rounded-[10px]">
            <DataTable
               action={true}
               data={user}
               columns={userColumn}
               disabledNext={true}
               disabledPrev={true}
               isLoading={isLoadingUser}
               topTable={
                  <div className="flex">
                     <Can I="create" a="user">
                        <div className="md:ml-[32px]">
                           <Dialog>
                              <DialogTrigger>
                                 <div className="dark:bg-submit bg-container hover:dark:bg-submit-hover border-dark transition text-white px-3 py-1 rounded-[6px] text-[16px]">
                                    Add User
                                 </div>
                              </DialogTrigger>
                              <DialogContent className="w-full">
                                 <DialogHeader>
                                    <DialogTitle>Add User</DialogTitle>
                                 </DialogHeader>
                                 <div className="px-4 py-2 w-full">
                                    <UserForm level={level} />
                                 </div>
                              </DialogContent>
                           </Dialog>
                        </div>
                     </Can>
                     <div>
                        <Can I="create" a="access">
                           <Dialog>
                              <DialogTrigger>
                                 <div className="dark:bg-submit bg-container border-dark transition hover:dark:bg-submit-hover text-white px-3 ml-[30px] py-1 rounded-[6px] text-[16px]">
                                    Add Feature
                                 </div>
                              </DialogTrigger>
                              <DialogContent className="w-full dark:bg-container">
                                 <div className="px-4 py-2 min-w-[700px] max-w-[800px]">
                                    <p className="text-[24px] text-[#525252] mb-[20px]">
                                       Add Features
                                    </p>
                                    <ModalPageAccess />
                                 </div>
                              </DialogContent>
                           </Dialog>
                        </Can>
                     </div>
                  </div>
               }
            >
               {(row: Row<Users>) => {
                  return (
                     <div key={row.index} className="flex items-center gap-4">
                        <Can I="update" a="user">
                           <Dialog>
                              <DialogTrigger>
                                 <Edit className="text-[green]" />
                              </DialogTrigger>
                              <DialogContent className="dark:bg-container">
                                 <DialogHeader>
                                    <DialogTitle>Edit user</DialogTitle>
                                 </DialogHeader>
                                 <div className="px-4 py-2">
                                    <EditUserForm
                                       level={level}
                                       defaultValue={row.original}
                                    />
                                 </div>
                              </DialogContent>
                           </Dialog>
                        </Can>
                        <Can I="update" a="user">
                           <Dialog
                              open={open}
                              onOpenChange={async (e) => {
                                 try {
                                    const res = await fetchingUser.get(
                                       `/delivery/v1/user/${row.original.id}`
                                    );
                                    const userData = res.data.data;
                                    setDetailAccess(res.data.data);
                                    for (let i in userData) {
                                       if (i === 'access') {
                                          setDefaultValues((prev: any) => ({
                                             ...prev,
                                             access: userData[i],
                                          }));
                                       }
                                       if (i === 'module') {
                                          const arr: any[] = [];
                                          userData[i].forEach((e: any) => {
                                             const valueFeature = `${e.feature}/${e.method}`;
                                             arr.push(valueFeature);
                                             setDefaultValues((prev: any) => ({
                                                ...prev,
                                                module: arr,
                                             }));
                                          });
                                       }
                                    }
                                    setOpen(e);
                                 } catch (error) {
                                    // do nothing
                                 }
                              }}
                           >
                              <DialogTrigger>
                                 <FolderLock className="text-[#d65421]" />
                              </DialogTrigger>
                              <DialogContent className="dark:bg-container">
                                 <DialogHeader>
                                    <p className="text-[24px] text-[#525252] mb-[10px]">
                                       User Access
                                    </p>
                                 </DialogHeader>
                                 <div className="px-4 py-2 min-w-[700px] max-w-[800px] max-h-[70vh] overflow-y-auto">
                                    <div className="flex gap-[20px]">
                                       <ModalAccess
                                          handleClose={handleCloseAccess}
                                          defaultValues={defaultValues}
                                          userFeature={userFeature}
                                          UserAccess={detailAccess}
                                       />
                                    </div>
                                 </div>
                              </DialogContent>
                           </Dialog>
                        </Can>

                        <Can I="delete" a="user">
                           <Dialog
                              open={openDelete}
                              onOpenChange={setOpenDelete}
                           >
                              <DialogTrigger>
                                 <Eraser className="text-[red]" />
                              </DialogTrigger>
                              <DialogContent>
                                 <DialogHeader>
                                    <p className="text-[19px] text-[#525252]">
                                       Delete User
                                    </p>
                                 </DialogHeader>
                                 <div className="px-2 min-w-[400px] max-w-[800px] max-h-[70vh] overflow-y-auto">
                                    <div className="flex gap-[20px] mb-[10px] text-[#525252]">
                                       Are you sure to delete{' '}
                                       {row.original.name}?
                                    </div>
                                    <div className="w-full flex justify-end mt-[10px]">
                                       <Button
                                          onClick={() => {
                                             postUser(row.original.id);
                                             setOpenDelete(false);
                                          }}
                                          size={'sm'}
                                          className="bg-[red] text-[14px] hover:bg-[#f34848]"
                                       >
                                          Delete
                                       </Button>
                                    </div>
                                 </div>
                              </DialogContent>
                           </Dialog>
                        </Can>
                     </div>
                  );
               }}
            </DataTable>
         </div>
      </div>
   );
};

export default User;
