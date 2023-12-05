import { useDispatch, useSelector } from 'react-redux';
import {
  deleteNote,
  setEditedNote,
} from '../../../store/reducers/notesReducer';
import { INoteState } from '../../../types/types';
import styles from './NoteCard.module.scss';
import { RootState } from '../../../store/store';
import { clearTags } from '../../../store/reducers/inputTagsReducer';

export function NoteCard(props: { note: INoteState; index: number }) {
  const { note, index } = props;
  const dispatch = useDispatch();
  const editedNoteIndex = useSelector(
    (state: RootState) => state.notes.editedNote
  );
  return (
    <div className={styles.container}>
      <h4>{note.text}</h4>
      <div className={styles.tags_block}>
        {note.tags.map((tag, ndx) => {
          return <span key={ndx}>{tag}</span>;
        })}
      </div>
      <div className={styles.buttons_block}>
        <button
          disabled={typeof editedNoteIndex === 'number'}
          onClick={() => {
            dispatch(setEditedNote(index));
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            dispatch(setEditedNote(null));
            dispatch(clearTags());
            dispatch(deleteNote(index));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
