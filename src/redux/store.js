import { configureStore } from '@reduxjs/toolkit'
import reducer from "../redux/rootReducers"

const store = configureStore(
  {
    reducer,
  },
);
export default store;
