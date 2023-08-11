import ServerFetching from '@/hooks/serverFetching';

async function getUsers() {
   const AuthFetching = ServerFetching();
   try {
      const res = await AuthFetching.get('/delivery/v1/users');
      return res.data.data;
   } catch (error) {
      return error;
   }
}

export { getUsers };
