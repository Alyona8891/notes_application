import { UseFormRegister } from 'react-hook-form';
import styles from './NoteInput.module.scss';
import { useDispatch } from 'react-redux';
import { addTags } from '../../../store/reducers/inputTagsReducer';

export function NoteInput(props: {
  register: UseFormRegister<{ note: string }>;
}) {
  const { register } = props;
  const { onChange, onBlur, name, ref } = register('note');
  const dispatch = useDispatch();
  return (
    <input
      onChange={(e) => {
        dispatch(addTags(e.target.value));
        onChange(e);
      }}
      onBlur={onBlur}
      name={name}
      ref={ref}
      className={styles.input}
      type={'text'}
    />
  );
}
