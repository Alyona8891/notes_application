import { NoteForm } from '../../UI/NoteForm/NoteForm';
import styles from './MainPage.module.scss';

export function MainPage(): React.ReactElement {
  return (
    <>
      <header>
        <NoteForm />
      </header>
      <main>
        <h3 className={styles.message}>MainPage</h3>
      </main>
      <footer />
    </>
  );
}
