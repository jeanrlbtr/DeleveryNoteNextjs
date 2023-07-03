'use client';

import { Container } from '@/components/item';
import { TableDetailNote } from '@/components/table';

const DetailNote = async ({ params }: { params: any }) => {
  const param: string = params.notes?.join('/');
  const newParam: string[] = param.split('');
  newParam.splice(0, 5);

  return (
    <Container title={`${newParam.join('')}`}>
      <TableDetailNote param={newParam.join('')} />
    </Container>
  );
};

export default DetailNote;
