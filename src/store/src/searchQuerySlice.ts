import {PayloadAction, createSlice} from "@reduxjs/toolkit";

type SearchQueryState = {
  query: string;
};

const initialState = {
  query: "",
} as SearchQueryState;

export const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState,
  reducers: {
    updateQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    clearQuery(state) {
      state.query = "";
    },
  },
});

export const {updateQuery, clearQuery} = searchQuerySlice.actions;

export default searchQuerySlice.reducer;
