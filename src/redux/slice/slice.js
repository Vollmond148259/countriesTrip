import {createSlice} from "@reduxjs/toolkit";
import reject from "lodash/reject"

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    favoriteCollection: [],
    pageCollection: [{city: "no", country: "country", lat: "1", lng: "1"}],
    showCollection: [{city: "no", country: "country", lat: "1", lng: "1"}],
    collection: [{city: "", country: "", lat: "1", lng: "1"}],
    searchValue: "",
    coordinates: [0, 0],
    randomCoordinates: [0, 0],
  },
  reducers: {
    putPageCollection: (state, action) => {
      state.pageCollection = action.payload;
    },
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
    putChoiceCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
    putRandomCoordinates: (state, action) => {
      state.randomCoordinates = action.payload;
    },
  },
});

export const {
  putPageCollection,
  putRandomCoordinates,
  putCollection,
  putSearchValue,
  putFavoriteCities,
  removeFavoriteCities,
  putShowCollection,
  putChoiceCoordinates,
} = counterSlice.actions;

export default counterSlice.reducer;
