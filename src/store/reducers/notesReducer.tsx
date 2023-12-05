import { createSlice } from '@reduxjs/toolkit';
import { INoteState } from '../../types/types';

export const initialState: { notes: INoteState[]; editedNote: null | number } =
  {
    notes: [],
    editedNote: null,
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
    },
    deleteNote: (state, action) => {
      const currentState = state;
      state.notes = currentState.notes.filter((_, i) => i !== action.payload);
    },
    editNote: (state, action) => {
      const { index, value } = action.payload;
      const tagsArr: string[] | [] = value
        .split(' ')
        .filter((el: string) => el.match(/#/));
      state.notes[index].text = value;
      state.notes[index].tags = tagsArr;
    },
    setEditedNote: (state, action) => {
      state.editedNote = action.payload;
    },
  },
});

export const { addNote, deleteNote, editNote, setEditedNote } =
  notesSlice.actions;
export const notesReducer = notesSlice.reducer;
