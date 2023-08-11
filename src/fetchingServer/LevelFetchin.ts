import ServerFetching from '@/hooks/serverFetching';

async function getLevel() {
   const AuthFetching = ServerFetching();
   try {
      const res = await AuthFetching.get('/delivery/v1/levels');
      return res.data.data;
   } catch (error) {
      return error;
   }
}

export { getLevel };
