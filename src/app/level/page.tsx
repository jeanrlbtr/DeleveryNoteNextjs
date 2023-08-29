import { Container } from '@/components/item';
import { LevelPage } from '@/components/page';
import fetchingServer from '@/fetchingServer';
import { LevelType, UserMeType } from '@/types';

const Level = async () => {
   const levelData = await fetchingServer<LevelType>(`/delivery/v1/levels`);
   const userMe = await fetchingServer<UserMeType>('/delivery/v1/user/me');

   return (
      <Container dataUser={userMe} title="Level">
         {levelData?.data && <LevelPage initialLevelData={levelData} />}
      </Container>
   );
};

export default Level;
