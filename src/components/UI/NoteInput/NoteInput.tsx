import { UseFormRegister } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addTags } from '../../../store/reducers/inputTagsReducer';
import { FormControl, Input, InputLabel } from '@mui/material';

export function NoteInput(props: {
  label: string;
  register: UseFormRegister<{ note: string }>;
}) {
  const { label, register } = props;
  const { onChange, onBlur, name, ref } = register('note');
  const dispatch = useDispatch();
  return (
    <FormControl>
      <InputLabel htmlFor="note-input">{label}</InputLabel>
      <Input
        id="note-input"
        sx={{ marginRight: '10px' }}
        onChange={(e) => {
          dispatch(addTags(e.target.value));
          onChange(e);
        }}
        onBlur={onBlur}
        name={name}
        ref={ref}
        type={'text'}
      />
    </FormControl>
  );
}
