import {createSlice} from "@reduxjs/toolkit";
import reject from "lodash/reject"

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    userCount: 10,
    favoriteCollection: [],
    userGuessTown: [{city: ""}],
    variantCollection: [],
    showCollection: [{city: "no", country: "country", lat: "1", lng: "1"}],
    collection: [{city: "", country: "", lat: "1", lng: "1"}],
    searchValue: "",
    coordinates: [0, 0],
    randomTown: [{city: ""}],
    randomCoordinates: [0, 0],
  },
  reducers: {
    addToUserCount: (state) => {
      state.userCount += 1
    },
    takeAwayToUserCount: (state) => {
      state.userCount -= 2
    },
    putUserGuessTown: (state, action) => {
      state.userguessTown = action.payload;
    },
    putVariantCollection: (state, action) => {
      state.variantCollection = action.payload;
    },
    putRandomTown: (state, action) => {
      state.randomTown = action.payload;
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
  addToUserCount,
  takeAwayToUserCount,
  putVariantCollection,
  putRandomTown,
  putUserGuessTown,
  putRandomCoordinates,
  putCollection,
  putSearchValue,
  putFavoriteCities,
  removeFavoriteCities,
  putShowCollection,
  putChoiceCoordinates,
} = counterSlice.actions;

export default counterSlice.reducer;
