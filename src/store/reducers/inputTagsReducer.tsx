import { createSlice } from '@reduxjs/toolkit';

export const initialState: { tags: string[] } = { tags: [] };

export const inputTagsSlice = createSlice({
  name: 'inputTags',
  initialState,
  reducers: {
    addTags: (state, action) => {
      state.tags = action.payload
        .split(' ')
        .filter((el: string) => el.match(/#/));
    },
    clearTags: (state) => {
      state.tags = [];
    },
  },
});

export const { addTags, clearTags } = inputTagsSlice.actions;
export const inputTagsReducer = inputTagsSlice.reducer;
