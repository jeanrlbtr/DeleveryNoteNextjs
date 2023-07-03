import React from 'react';
import { DataTable } from './DataTabel';
import { LoadingColumn } from './columns';

const TableLoading = () => {
  return (
    <DataTable
      columns={LoadingColumn}
      data={[
        {
          loading: 'loading',
        },
      ]}
    />
  );
};

export default TableLoading;
