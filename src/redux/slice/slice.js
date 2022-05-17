import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    favoriteCollection: [{ city: "no",country:"country"}],
    collection: [{ city: "p",country:"us" }],
    searchValue: "a",
  },
  reducers: {
    putCollection: (state, action) => {
      state.collection = action.payload;
    },
    putSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    putFavoriteCities: (state, action) => {
    state.favoriteCollection.push(action.payload)
    },
  },
});

export const { putCollection, putSearchValue,putFavoriteCities } =
  counterSlice.actions;

export default counterSlice.reducer;
