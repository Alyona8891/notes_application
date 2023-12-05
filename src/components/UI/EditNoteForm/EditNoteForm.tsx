import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { editNote, setEditedNote } from '../../../store/reducers/notesReducer';
import { addTags, clearTags } from '../../../store/reducers/inputTagsReducer';
import styles from './EditNoteForm.module.scss';
import { NoteInput } from '../NoteInput/NoteInput';
import { useEffect } from 'react';

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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className={styles.input_block}>
        <span>Change text of note</span>
        <NoteInput register={register} />
      </label>
      {formTags.map((tag, ndx) => {
        return <span key={ndx}>{tag}</span>;
      })}
      <button className={styles.save_button} type="submit" disabled={!isDirty}>
        Save note
      </button>
      <button
        className={styles.save_button}
        onClick={handleCancelButton}
        type="button"
      >
        Cancel
      </button>
    </form>
  );
}
