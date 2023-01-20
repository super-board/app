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

      if (state.selectedTagIds.length === 5) {
        console.error("5개 까지만 고를 수 있어요!");
        return;
      }

      state.selectedTagIds = [...state.selectedTagIds, targetId];
    },
  },
});

export const {toggleSelectedTag} = interestTagSlice.actions;

export default interestTagSlice.reducer;
