import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import keys from "@/constants/keys";
import {AsyncStorageService} from "@/services/storage";

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
    updateSelectedTags(state, action: PayloadAction<number[]>) {
      state.selectedTagIds = action.payload;
    },
    clearSelectedTags(state) {
      state.selectedTagIds = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(loadInterestTagsAsync.fulfilled, (state, action) => {
      state.selectedTagIds = action.payload;
    });
  },
});

export const loadInterestTagsAsync = createAsyncThunk(
  "interestTag/loadInterestTagsStatus",
  async () => {
    return await AsyncStorageService.getData(keys.INTEREST_TAG_IDS);
  },
);

export const {toggleSelectedTag, updateSelectedTags, clearSelectedTags} = interestTagSlice.actions;

export default interestTagSlice.reducer;
