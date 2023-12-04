import { createSlice } from '@reduxjs/toolkit';
import { INoteState } from '../../types/types';

export const initialState: INoteState[] = [];

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      const tagsArr: string[] | [] = action.payload
        .split(' ')
        .filter((el: string) => el.match(/#/));
      state.push({
        text: action.payload,
        tags: tagsArr,
      });
    },
  },
});

export const { addNote } = notesSlice.actions;
export const notesReducer = notesSlice.reducer;
