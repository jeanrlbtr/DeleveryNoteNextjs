'use client';
import React, { useState } from 'react';
import { DataTable } from './DataTabel';
import { LevelColumn } from './columns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import ClientFetching from '@/hooks/clientFetching';
import { useQuery } from '@tanstack/react-query';
import TableLoading from './TableLoading';

const TableLevel = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const axiosFetching = ClientFetching();
  const { data: levelData, isLoading } = useQuery({
    queryKey: ['getLevel'],
    queryFn: async () => {
      const res = await axiosFetching.get('/delivery/v1/levels');
      return res.data.data;
    },
  });

  if (isLoading) {
    return <TableLoading />;
  }

  return (
    <DataTable
      data={levelData}
      columns={LevelColumn}
      action={true}
      topTable={
        <Dialog
          open={open}
          onOpenChange={() => {
            setOpen((prev) => (!prev ? true : false));
          }}
        >
          <DialogTrigger>
            <div className='ml-6 bg-[#140e27] text-white px-3 py-1 rounded-[6px] text-[16px]'>Add Level</div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Level</DialogTitle>
            </DialogHeader>
            <div>
              <form
                onSubmit={handleSubmit((data) => {
                  const code = parseInt(`${data.code}`);
                  //  postLevel({ name: data.name, code });
                })}
                className='flex flex-col gap-[20px]'
              >
                <Input
                  {...register('name', { required: 'name is required' })}
                  type='text'
                  placeholder='name'
                />
                <Input
                  {...register('code', { required: 'code is required' })}
                  type='number'
                  placeholder='code'
                />
                <Button
                  type='submit'
                  className='bg-[#0f4912]'
                >
                  Submit
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      {(row: any) => {
        return (
          <Dialog>
            <DialogTrigger>
              <div
                className='bg-[green] py-1 px-[10px]  text-white rounded-[6px] text-[14px]'
                onClick={() => {
                  setValue('name', `${row.original.name}`);
                  setValue('code', `${row.original.code}`);
                }}
              >
                Edit
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Level</DialogTitle>
              </DialogHeader>
              <div>
                <form
                  onSubmit={handleSubmit((data) => {
                    const code = parseInt(`${data.code}`);
                    // editLevel({ name: data.name, code });
                  })}
                  className='flex flex-col gap-[20px]'
                >
                  <Input
                    {...register('name', { required: 'name is required' })}
                    type='text'
                    placeholder='name'
                  />
                  <Input
                    {...register('code', { required: 'code is required' })}
                    type='number'
                    placeholder='code'
                  />
                  <Button
                    type='submit'
                    className='bg-[#0f4912]'
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        );
      }}
    </DataTable>
  );
};

export default TableLevel;
