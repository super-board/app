import {PayloadAction, createSlice} from "@reduxjs/toolkit";

type InterestTagState = {
  selectedTagIds: number[];
};

const initialState = {
  selectedTagIds: [],
} as InterestTagState;

export const interestTagSlice = createSlice({
  name: "interestTag",
  initialState,
  reducers: {
    toggleSelectedTag(state, action: PayloadAction<number>) {
      const targetId = action.payload;
      if (state.selectedTagIds.includes(targetId)) {
        state.selectedTagIds = state.selectedTagIds.filter(id => id !== targetId);
        return;
      }

      state.selectedTagIds = [...state.selectedTagIds, targetId];
    },
    clearSelectedTags(state) {
      state.selectedTagIds = [];
    },
  },
});

export const {toggleSelectedTag, clearSelectedTags} = interestTagSlice.actions;

export default interestTagSlice.reducer;
