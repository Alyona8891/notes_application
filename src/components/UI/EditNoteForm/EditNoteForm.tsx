import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { editNote, setEditedNote } from '../../../store/reducers/notesReducer';
import { addTags, clearTags } from '../../../store/reducers/inputTagsReducer';
import styles from './EditNoteForm.module.scss';
import { NoteInput } from '../NoteInput/NoteInput';
import { useEffect } from 'react';
import { Button } from '@mui/material';

export function EditNoteForm(): React.ReactElement {
  const dispatch = useDispatch();
  const editedNoteIndex = useSelector(
    (state: RootState) => state.notes.editedNote
  );
  const editedNote = useSelector(
    (state: RootState) => state.notes.notes[editedNoteIndex as number]
  );

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: { note: '' },
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('note', editedNote.text);
    dispatch(addTags(editedNote.text));
  }, [dispatch, editedNote.text, setValue]);

  const formTags = useSelector((state: RootState) => state.inputTags.tags);

  const onSubmit: SubmitHandler<FieldValues> = (note) => {
    dispatch(editNote({ index: editedNoteIndex, value: note }));
    dispatch(setEditedNote(null));
    reset();
    dispatch(clearTags());
  };

  const handleCancelButton = () => {
    dispatch(setEditedNote(null));
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
        <NoteInput label="Change text of note" register={register} />
        <Button
          variant="outlined"
          size="medium"
          type="submit"
          disabled={!isDirty}
          sx={{ marginRight: '5px' }}
        >
          Save note
        </Button>
        <Button
          variant="outlined"
          size="medium"
          onClick={handleCancelButton}
          type="button"
        >
          Cancel
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
