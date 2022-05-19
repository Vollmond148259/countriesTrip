import {combineReducers} from "@reduxjs/toolkit";
import counter from "./slice/slice";
import countTest from "../redux/slice/countTest";
import users from "../redux/slice/userTest"

export default combineReducers({
  counter,
  countTest,
  users,
});
