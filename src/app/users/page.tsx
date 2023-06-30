import { Container } from '@/components/item';
import TableUser from '@/components/table/TableUser';
import { getLevel } from '@/fetchingServer/LevelFetchin';
import { getUsers } from '@/fetchingServer/UserFetching';
import React from 'react';

const LevelPage = async () => {
  const levelData = await getLevel();
  const userData = await getUsers();
  return (
    <Container title='Users'>
      <TableUser
        level={levelData}
        user={userData}
      ></TableUser>
    </Container>
  );
};

export default LevelPage;
