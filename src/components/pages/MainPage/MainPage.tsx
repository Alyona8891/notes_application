import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { CreateNoteForm } from '../../UI/NoteForm/CreateNoteForm';
//import styles from './MainPage.module.scss';
import { NoteCard } from '../../UI/NoteCard/NoteCard';
import { EditNoteForm } from '../../UI/EditNoteForm/EditNoteForm';

export function MainPage(): React.ReactElement {
  const notes = useSelector((state: RootState) => state.notes);
  const editedNote = useSelector((state: RootState) => state.notes.editedNote);
  return (
    <>
      <header>
        {typeof editedNote === 'number' ? <EditNoteForm /> : <CreateNoteForm />}
      </header>
      <main>
        <section>
          {notes.notes.map((note, ndx) => (
            <NoteCard note={note} index={ndx} key={ndx} />
          ))}
        </section>
      </main>
      <footer />
    </>
  );
}
