import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../../../store/reducers/notesReducer';
import styles from './CreateNoteForm.module.scss';
import { NoteInput } from '../NoteInput/NoteInput';
import { RootState } from '../../../store/store';
import { clearTags } from '../../../store/reducers/inputTagsReducer';
import { Button } from '@mui/material';

export function CreateNoteForm(): React.ReactElement {
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
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <NoteInput label="Enter text of note" register={register} />
        <Button
          variant="outlined"
          size="medium"
          type="submit"
          disabled={!isDirty}
        >
          Create note
        </Button>
      </form>
      <div>
        {formTags.map((tag, ndx) => {
          return (
            <span className={styles.tag} key={ndx}>
              {tag}
            </span>
          );
        })}
      </div>
    </>
  );
}
