import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { CreateNoteForm } from '../../UI/NoteForm/CreateNoteForm';
//import styles from './MainPage.module.scss';
import { NoteCard } from '../../UI/NoteCard/NoteCard';
import { EditNoteForm } from '../../UI/EditNoteForm/EditNoteForm';
import { SideBar } from './conponents/SideBar/SideBar';
import { setFilteredNotes } from '../../../store/reducers/notesReducer';
import { useEffect } from 'react';

export function MainPage(): React.ReactElement {
  const dispatch = useDispatch();
  const activeFilters = useSelector(
    (state: RootState) => state.notes.activeFilters
  );
  const notes = useSelector((state: RootState) => state.notes);

  const editedNote = useSelector((state: RootState) => state.notes.editedNote);

  useEffect(() => {
    if (activeFilters.length > 0) {
      dispatch(setFilteredNotes());
    }
  }, [activeFilters, dispatch]);

  return (
    <>
      <header>
        {typeof editedNote === 'number' ? <EditNoteForm /> : <CreateNoteForm />}
      </header>
      <SideBar />
      <main>
        <section>
          {activeFilters.length === 0
            ? notes.notes.map((note, ndx) => (
                <NoteCard note={note} index={ndx} key={ndx} />
              ))
            : notes.filteredNotes.map((note, ndx) => (
                <NoteCard note={note} index={ndx} key={ndx} />
              ))}
        </section>
      </main>
      <footer />
    </>
  );
}
