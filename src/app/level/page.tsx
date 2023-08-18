import { Container } from '@/components/item';
import { LevelPage } from '@/components/page';
import { getLevel } from '@/fetchingServer/LevelFetching';

const Level = async () => {
   const levelData = await getLevel();
   return (
      <Container title="Level">
         <LevelPage initialLevelData={levelData} />
      </Container>
   );
};

export default Level;
