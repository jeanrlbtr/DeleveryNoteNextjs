import React from 'react';
import { DataTable } from './DataTabel';
import { LoadingColumn } from './columns';

const TableLoading = () => {
   return (
      <DataTable
         columns={LoadingColumn}
         type={'loading'}
         data={[
            {
               loading: 'loading',
            },
         ]}
      />
   );
};

export default TableLoading;
