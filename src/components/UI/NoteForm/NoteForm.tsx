import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../../../store/reducers/notesReducer';
import styles from './NoteForm.module.scss';
import { NoteInput } from '../NoteInput/NoteInput';
import { RootState } from '../../../store/store';
import { clearTags } from '../../../store/reducers/inputTagsReducer';

export function NoteForm(): React.ReactElement {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: { note: '' },
    mode: 'onChange',
  });

  const formTags = useSelector((state: RootState) => state.inputTags.tags);

  const onSubmit: SubmitHandler<FieldValues> = (note) => {
    dispatch(addNote(note.note));
    reset();
    dispatch(clearTags());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className={styles.input_block}>
        <span>Enter text of note</span>
        <NoteInput register={register} />
      </label>
      {formTags.map((tag, ndx) => {
        return <span key={ndx}>{tag}</span>;
      })}
      <button className={styles.save_button} type="submit" disabled={!isDirty}>
        Sign up
      </button>
    </form>
  );
}
