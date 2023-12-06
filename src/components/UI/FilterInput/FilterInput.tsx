import { useDispatch } from 'react-redux';
import {
  addActiveFilter,
  deleteActiveFilter,
  setFilteredNotes,
} from '../../../store/reducers/notesReducer';
import { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

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
    <FormControlLabel
      control={<Checkbox onClick={handleCheckbox} color="success" />}
      label={filter}
    />
  );
}
