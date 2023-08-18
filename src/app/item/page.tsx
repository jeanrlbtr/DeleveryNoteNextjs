'use client';

import { Container } from '@/components/item';
import { ItemPo } from '@/components/page';

const page = () => {
   return (
      <Container title="Items Purchase Order">
         <div className="w-full ">
            <ItemPo />
         </div>
      </Container>
   );
};

export default page;
