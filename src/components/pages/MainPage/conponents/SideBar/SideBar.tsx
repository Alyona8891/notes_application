import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { FilterInput } from '../../../../UI/FilterInput/FilterInput';

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
    <aside>
      {filters.map((filter, ndx) => (
        <FilterInput filter={filter} key={ndx} />
      ))}
    </aside>
  );
}
