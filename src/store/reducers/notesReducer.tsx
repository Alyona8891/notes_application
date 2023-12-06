import { createSlice } from '@reduxjs/toolkit';
import { INoteState } from '../../types/types';

export const initialState: {
  notes: INoteState[];
  editedNote: null | number;
  filteredNotes: INoteState[];
  activeFilters: string[];
} = localStorage.getItem('Alyona8891notes')
  ? {
      notes: JSON.parse(localStorage.getItem('Alyona8891notes') as string),
      editedNote: null,
      filteredNotes: [],
      activeFilters: [],
    }
  : {
      notes: [],
      editedNote: null,
      filteredNotes: [],
      activeFilters: [],
    };

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      const tagsArr: string[] | [] = action.payload
        .split(' ')
        .filter((el: string) => el.match(/#/));
      state.notes.push({
        text: action.payload,
        tags: tagsArr,
      });
      localStorage.setItem('Alyona8891notes', JSON.stringify(state.notes));
    },
    deleteNote: (state, action) => {
      const currentState = state;
      state.notes = currentState.notes.filter((_, i) => i !== action.payload);
      localStorage.setItem('Alyona8891notes', JSON.stringify(state.notes));
    },
    editNote: (state, action) => {
      const { index, value } = action.payload;
      const tagsArr: string[] | [] = value.note
        .split(' ')
        .filter((el: string) => el.match(/#/));
      state.notes[index].text = value.note;
      state.notes[index].tags = tagsArr;
      localStorage.setItem('Alyona8891notes', JSON.stringify(state.notes));
    },
    setEditedNote: (state, action) => {
      state.editedNote = action.payload;
    },
    addActiveFilter: (state, action) => {
      state.activeFilters.push(action.payload);
    },
    deleteActiveFilter: (state, action) => {
      state.activeFilters = state.activeFilters.filter(
        (filter) => filter !== action.payload
      );
    },
    setFilteredNotes: (state) => {
      for (const key of state.activeFilters) {
        state.filteredNotes = state.notes.filter((note) =>
          note.tags.includes(key as never)
        );
      }
    },
  },
});

export const {
  addNote,
  deleteNote,
  editNote,
  setEditedNote,
  setFilteredNotes,
  addActiveFilter,
  deleteActiveFilter,
} = notesSlice.actions;
export const notesReducer = notesSlice.reducer;
