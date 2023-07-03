import { Button } from '../../../components/ui/button';
import { useForm } from 'react-hook-form';
import { useToast } from '../../../components/ui/use-toast';
import { Icon } from '@iconify/react';
import { API } from '@/lib/api';
import ClientFetching from '@/hooks/clientFetching';
import { useQuery } from '@tanstack/react-query';

interface Inputs {
  access: string[];
  module: any[];
}

const ModalAccess = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const defaultValues: { module: any[]; access: string[] } = {
    access: [],
    module: [],
  };
  const axiosFetching = ClientFetching();
  const { data: UserAccess, isLoading: isLoadingAccess } = useQuery({
    queryFn: async () => {
      const res = await axiosFetching.get(`/delivery/v1/user/${id}`);
      return res.data?.data;
    },
    queryKey: ['getAccess'],
  });
  const { data: userFeature, isLoading: isLoadingFeature } = useQuery({
    queryFn: async () => {
      const res = await axiosFetching.get(`/delivery/v1/feature`);
      return res.data;
    },
    queryKey: ['getFeature'],
  });
  if (!isLoadingAccess && !isLoadingFeature) {
    for (let i in UserAccess) {
      if (i === 'access') {
        defaultValues.access = UserAccess[i];
      }
      if (i === 'module') {
        UserAccess[i].forEach((e: any) => {
          const valueFeature = `${e.feature}/${e.method}`;
          defaultValues.module.push(valueFeature);
        });
      }
    }
  }

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      access: defaultValues.access,
      module: defaultValues.module,
    },
  });

  const applyAccess = async (data: any) => {
    const newArr: any = [];
    data.module.forEach((e: any) => {
      const data = e.split('/');
      newArr.push({ feature: data[0], module: data[1] });
    });

    const moduleData = newArr.reduce((acc: any, item: any) => {
      const { feature, module } = item;
      const existingFeature = acc.find((obj: any) => obj.feature === feature);
      if (existingFeature) {
        existingFeature.method.push(module);
      } else {
        acc.push({ feature, method: [module] });
      }

      return acc;
    }, []);
    try {
      // const res = await API.post('/delivery/v1/user/access', {
      // userId: id,
      // access: data.access,
      // module: moduleData,
      // });
      const res = await axiosFetching.post('/delivery/v1/user/access', {
        userId: id,
        access: data.access,
        module: moduleData,
      });
      toast({
        title: res.data.message,
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: error.data.message,
        duration: 3000,
      });
    }
    // const mutateData = {
    //   method: 'post',
    //   headers: 'json',
    //   url: '/delivery/v1/user/access',
    //   body: {
    //     userId: id,
    //     access: data.access,
    //     module: moduleData,
    //   },
    // };
    // mutate(mutateData);
  };

  return (
    <>
      {isLoadingAccess ||
        (isLoadingFeature ? (
          <div>waiting</div>
        ) : (
          <div className='w-full shadow-lg rounded-[10px] p-3'>
            <form
              onSubmit={handleSubmit((data) => {
                applyAccess(data);
              })}
            >
              <div className=''>
                <p className='text-[#525252] text-[19px]'>Page</p>
                <div className='mt-[13px] flex  gap-[10px]'>
                  <div className='flex items-center space-x-2'>
                    <input
                      id='note'
                      type='checkbox'
                      defaultChecked={UserAccess?.access.find((item: any) => item == 'note') === 'note'}
                      className='w-[15px]  border-[#d1cfcf]'
                      value={'note'}
                      {...register('access')}
                    />
                    <label
                      htmlFor='note'
                      className='text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      Delevery Note
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <input
                      id='profile'
                      type='checkbox'
                      className='w-[15px]  border-[#d1cfcf]'
                      value={'profile'}
                      defaultChecked={UserAccess?.access.find((item: any) => item == 'profile') === 'profile'}
                      {...register('access')}
                    />
                    <label
                      htmlFor='profile'
                      className='text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      Profile
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <input
                      id='users'
                      type='checkbox'
                      className='w-[15px]  border-[#d1cfcf]'
                      defaultChecked={UserAccess?.access.find((item: any) => item == 'users') === 'users'}
                      value={'users'}
                      {...register('access')}
                    />
                    <label
                      htmlFor='users'
                      className='text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      Users
                    </label>
                  </div>
                </div>
              </div>
              <div className='mt-[15px]'>
                <p className='text-[#525252] text-[19px] mb-[10px]'>User Access</p>
                <div className=' flex flex-col gap-[10px]'>
                  {userFeature?.data.map((feature: any, i: number) => {
                    return (
                      <div
                        key={i}
                        className='flex flex-col space-x-2'
                      >
                        <p className='text-[#525252] text-[18px] capitalize mb-[10px]'>{feature.feature}</p>
                        <div className='flex gap-[20px]'>
                          {feature.method.map((dt: any, index: number) => {
                            return (
                              <div
                                key={index}
                                className='flex gap-[4px]'
                              >
                                <input
                                  id={`${feature.feature}/${dt}`}
                                  type='checkbox'
                                  className='w-[15px]  border-[#d1cfcf]'
                                  value={`${feature.feature}/${dt}`}
                                  {...register('module')}
                                />
                                <label
                                  htmlFor={`${feature.feature}/${dt}`}
                                  className='capitalize text-[17px] text-[#525252] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                >
                                  {dt}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Button
                type='submit'
                className='w-full  h-max p-[1px] mt-[40px] disabled:cursor-not-allowed text-[17px] bg-[#2e49e4] hover:bg-[#090961]'
              >
                Apply
              </Button>
            </form>
          </div>
        ))}
    </>
  );
};

export default ModalAccess;
