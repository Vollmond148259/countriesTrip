import {createSlice} from "@reduxjs/toolkit";

export const userTestSlice = createSlice({
  name: "users",
  preloadedState: {
    isLoading: false,
    userCollection: [],
  },
  initialState: {
    isLoading: false,
    userCollection: [],
  },
  reducers: {
    userLoading: (state) => {
      state.isLoading = true;
    },
    putUsersSuccess: (state, action) => {
      state.userCollection = action.payload;
      state.isLoading = false;
    },
  },
});

export const {userLoading, putUsersSuccess} =
  userTestSlice.actions;
export default userTestSlice.reducer;
