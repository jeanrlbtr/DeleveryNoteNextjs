import ServerFetching from '@/hooks/serverFetching';

async function getNote() {
  const AuthFetching = ServerFetching();
  try {
    const res = await AuthFetching.get('/delivery/v1/notes?page=1&limit=100');
    return res.data.data;
  } catch (error) {
    return error;
  }
}

export { getNote };
