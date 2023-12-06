import { useDispatch } from 'react-redux';
import {
  addActiveFilter,
  deleteActiveFilter,
  setFilteredNotes,
} from '../../../store/reducers/notesReducer';
import { useState } from 'react';

export function FilterInput(props: { filter: string }) {
  const { filter } = props;
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckbox = () => {
    if (isChecked) {
      setIsChecked(false);
      dispatch(deleteActiveFilter(filter));
      dispatch(setFilteredNotes());
    } else {
      setIsChecked(true);
      dispatch(addActiveFilter(filter));
      dispatch(setFilteredNotes());
    }
  };
  return (
    <label>
      <input onClick={handleCheckbox} type="checkbox" />
      <span>{filter}</span>
    </label>
  );
}
