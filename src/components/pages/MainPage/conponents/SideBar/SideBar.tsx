import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { FilterInput } from '../../../../UI/FilterInput/FilterInput';
import { List, ListItem, Typography } from '@mui/material';
import Container from '@mui/material/Container';

const style = {
  position: 'absolute',
  top: '0',
  width: '20%',
  height: '100%',
  bgcolor: '#cfe8fc',
};

export function SideBar(): React.ReactElement {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const tagsArr = notes.reduce(
    (accumulator: string[], currentValue) =>
      accumulator.concat(currentValue.tags),
    []
  );
  const filtersSet = new Set(tagsArr);
  const filters = Array.from(filtersSet);
  return (
    <Container component="aside" sx={style}>
      <List component="ul" aria-label="mailbox folders">
        <Typography gutterBottom variant="h6" sx={{ textAlign: 'center' }}>
          Filters
        </Typography>
        {filters.map((filter, ndx) => (
          <ListItem key={ndx}>
            <FilterInput filter={filter} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
