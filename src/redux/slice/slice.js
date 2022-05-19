import {createSlice} from "@reduxjs/toolkit";
import reject from "lodash/reject"

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    favoriteCollection: [],
    showCollection: [{city: "no", country: "country"}],
    collection: [{city: "p", country: "us"}],
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
      state.favoriteCollection.push(action.payload);
    },
    removeFavoriteCities: (state, action) => {
      state.favoriteCollection = reject(state.favoriteCollection, action.payload)
    },
    putShowCollection: (state, action) => {
      state.showCollection = action.payload;
    },
  },
});

export const {
  putCollection,
  putSearchValue,
  putFavoriteCities,
  removeFavoriteCities,
  putShowCollection,
} = counterSlice.actions;

export default counterSlice.reducer;
