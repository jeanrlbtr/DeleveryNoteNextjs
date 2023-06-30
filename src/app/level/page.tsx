import { Container } from '@/components/item';
import TableLevel from '@/components/table/TableLevel';
import { getLevel } from '@/fetchingServer/LevelFetchin';
import React from 'react';

const LevelPage = async () => {
  const levelData = await getLevel();
  return (
    <Container title='Level'>
      <TableLevel levelData={levelData}></TableLevel>
    </Container>
  );
};

export default LevelPage;
