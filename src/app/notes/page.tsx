import { Container } from '@/components/item';
import TableNote from '@/components/table/TableNote';
import { getNote } from '@/fetchingServer/NoteFetching';

async function DeleveryNote() {
  const data = await getNote();
  return (
    <Container title='Delevery Note'>
      <TableNote data={data.notes} />
    </Container>
  );
}

export default DeleveryNote;
