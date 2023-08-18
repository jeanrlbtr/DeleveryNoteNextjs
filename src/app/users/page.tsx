import { Container } from '@/components/item';
import User from '@/components/page/User/User';

const UserPage = async () => {
   return (
      <Container title="Users">
         <User />
      </Container>
   );
};

export default UserPage;
