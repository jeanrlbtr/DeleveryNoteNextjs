'use client';

import AddDriver from '@/components/item/Form/AddDriver';
import EditDriver from '@/components/item/Form/EditDriver';
import ConfirmationDelete from '@/components/item/modal/ConfirmationDelete';
import { DataTable } from '@/components/table/DataTabel';
import { driverColumn } from '@/components/table/columns';
import { UseQueryFetching } from '@/hooks/UseQueryFetch';
import { DriverDetailT, DriverInfoT, UserDataType } from '@/types';
import { Row } from '@tanstack/react-table';

interface DriverProps {
   driverData: DriverInfoT;
   userData: UserDataType;
}

const Driver = ({ driverData, userData }: DriverProps) => {
   const { data } = UseQueryFetching<DriverInfoT>(
      '/delivery/v1/drivers',
      ['driver'],
      driverData
   );
   const driver = data?.data || driverData.data;
   const { data: user } = UseQueryFetching<UserDataType>(
      '/delivery/v1/users',
      ['getUser'],
      userData
   );
   const allUserData = user?.data || userData.data;
   return (
      <div className="dark:bg-container bg-white px-[20px] pt-[20px] rounded-[10px]">
         <DataTable
            topTable={<AddDriver allUserData={allUserData} />}
            data={driver}
            columns={driverColumn}
            action={true}
         >
            {(row: Row<DriverDetailT>) => {
               return (
                  <div className="flex gap-4">
                     <EditDriver
                        driverId={`${row.original.id}`}
                        platNo={row.original.platNo}
                     />
                     <ConfirmationDelete
                        driverId={row.original.id}
                        name={row.original.User.name}
                     />
                  </div>
               );
            }}
         </DataTable>
      </div>
   );
};

export default Driver;
