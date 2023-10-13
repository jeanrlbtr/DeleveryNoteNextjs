import { LevelPage } from '@/components/page';
import fetchingServer from '@/fetchingServer';
import { LevelType } from '@/types';

const Level = async () => {
   const levelData = await fetchingServer<LevelType>(`/delivery/v1/levels`);
   return <>{levelData?.data && <LevelPage initialLevelData={levelData} />}</>;
};

export default Level;
