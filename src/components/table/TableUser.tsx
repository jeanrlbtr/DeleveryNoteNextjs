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
interface Props {
  user: any;
  level: any;
}

const TableUser = ({ user, level }: Props) => {
  const [id, setid] = useState<string>();
  const fetchingUser = ClientFetching();
  const getUserDetail = async () => {
    try {
      const res = await fetchingUser.get(`/delivery/v1/user/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
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
                    // onClick={() => {
                    //   setDetailUser(row.original);
                    //   getLevel();
                    // }}
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
                      defaultValue={{}}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div>
              <Dialog>
                <DialogTrigger>
                  <div
                    // onClick={() => {
                    //   setId(row.original.id);
                    //   if (id) {
                    //     getUserData();
                    //     getFeature();
                    //     setOpenAccess(true);
                    //   }
                    // }}
                    className='bg-[#d65421] text-[13px] text-[white] rounded-[6px] px-2 py-1'
                  >
                    Access
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>User Access</DialogTitle>
                  </DialogHeader>
                  <div className='px-4 py-2 min-w-[700px] max-w-[800px]'>
                    <p className='text-[24px] text-[#525252] mb-[20px]'>User Access</p>
                    <div className='flex gap-[20px]'>
                      <ModalAccess
                        data={[]}
                        id={''}
                        userData={{}}
                      />
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
