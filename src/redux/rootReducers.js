import { combineReducers } from "@reduxjs/toolkit";
import counter from "./slice/slice";

export default combineReducers({
  counter,
});
