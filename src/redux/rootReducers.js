import { combineReducers } from "@reduxjs/toolkit";
import counter from "./slice/slice";
import countTest from "../redux/slice/countTest";

export default combineReducers({
  counter,
  countTest,
});
