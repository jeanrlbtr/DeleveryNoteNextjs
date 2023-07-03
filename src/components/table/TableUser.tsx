'use client';
import React, { useState } from 'react';
import { DataTable } from './DataTabel';
import { userColumn } from './columns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import UserForm from '../item/Form/UserForm';
import ModalPageAccess from '../item/Form/PageAccessForm';
import EditUserForm from '../item/Form/EditUserForm';
import ModalAccess from '../item/Form/AccessForm';
import ClientFetching from '@/hooks/clientFetching';
import { useQuery } from '@tanstack/react-query';
import TableLoading from './TableLoading';

const TableUser = () => {
  const [detailUser, setDetailUser] = useState<any>({});
  const fetchingUser = ClientFetching();
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
  if (isLoadingLevel || isLoadingUser) {
    return <TableLoading />;
  }
  return (
    <DataTable
      action={true}
      data={user}
      columns={userColumn}
      topTable={
        <div className='ml-[32px] flex'>
          <div className=''>
            <Dialog>
              <DialogTrigger>
                <div className='bg-[#140e27] text-white px-3 py-1 rounded-[6px] text-[16px]'>Add User</div>
              </DialogTrigger>
              <DialogContent className='w-full'>
                <DialogHeader>
                  <DialogTitle>Add Level</DialogTitle>
                </DialogHeader>
                <div className='px-4 py-2 w-full'>
                  <UserForm level={level} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <Dialog>
              <DialogTrigger>
                <div className='bg-[#d65421] text-white px-3 ml-[30px] py-1 rounded-[6px] text-[16px]'>Add Feature</div>
              </DialogTrigger>
              <DialogContent className='w-full'>
                <DialogHeader>
                  <DialogTitle>Add Feature</DialogTitle>
                </DialogHeader>
                <div className='px-4 py-2 min-w-[700px] max-w-[800px]'>
                  <p className='text-[24px] text-[#525252] mb-[20px]'>Add Features</p>
                  <ModalPageAccess />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      }
    >
      {(row: any) => {
        return (
          <div
            key={row.index}
            className='flex items-center gap-4'
          >
            <div>
              <Dialog>
                <DialogTrigger>
                  <div
                    onClick={() => setDetailUser(row.original)}
                    className='bg-[green] w-[50px] text-[13px] text-[white] rounded-[6px] px-2 py-1'
                  >
                    Edit
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit user</DialogTitle>
                  </DialogHeader>
                  <div className='px-4 py-2'>
                    <EditUserForm
                      level={level}
                      defaultValue={detailUser}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <Dialog>
                <DialogTrigger>
                  <div className='bg-[#d65421] text-[13px] text-[white] rounded-[6px] px-2 py-1'>Access</div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>User Access</DialogTitle>
                  </DialogHeader>
                  <div className='px-4 py-2 min-w-[700px] max-w-[800px]'>
                    <p className='text-[24px] text-[#525252] mb-[20px]'>User Access</p>
                    <div className='flex gap-[20px]'>
                      <ModalAccess id={`${row.original.id}`} />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        );
      }}
    </DataTable>
  );
};

export default TableUser;
