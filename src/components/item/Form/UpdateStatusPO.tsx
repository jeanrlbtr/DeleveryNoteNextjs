import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import MutationFetch from '@/hooks/MutationFetch';
import { Loader } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

interface DefaulValue {
  status: string;
  note: string;
}

const UpdateStatusPO = ({ no }: { no: string }) => {
  const status = ['PROCESS', 'CANCELED', 'UNCOMPLETED', 'FINISH'];
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<DefaulValue>();

  const disable = Object.keys(errors).length > 0;

  const { mutate, isLoading } = MutationFetch(['getDetailNote']);
  return (
    <div className='w-[500px]'>
      <p className='text-[20px] text-[#3d3d3d]'>Update Status PO</p>
      <form
        onSubmit={handleSubmit((data) => {
          mutate({
            body: { ...data, no },
            url: '/delivery/v1/note',
            headers: 'json',
            method: 'patch',
          });
        })}
        className='mt-[20px] flex flex-col gap-[22px]'
      >
        <div>
          <p className='ml-1 text-[#525252] text-[13px] '>
            Status <span className='text-[red]'>*</span>
          </p>
          <Select
            required
            onValueChange={(e: string) => setValue('status', e)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              {status.map((data, index) => (
                <SelectItem
                  value={`${data}`}
                  key={index}
                >
                  {data}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className='ml-1 text-[#525252] text-[13px] '>
            Note <span className='text-[red]'>*</span>
          </p>
          <Input
            placeholder='Note'
            {...register('note', {
              required: 'Note must be required',
              minLength: 6,
            })}
          />
        </div>
        <Button
          type='submit'
          className='w-max bg-[#405189]'
          disabled={disable}
        >
          {isLoading ? <Loader /> : 'Update Status'}
        </Button>
      </form>
    </div>
  );
};

export default UpdateStatusPO;
