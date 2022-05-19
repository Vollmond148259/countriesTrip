import {countryWatcher, countWatcher} from "./countrySaga";
import {getUserWatcher} from "../saga/users"
import {all} from "redux-saga/effects";

function* rootSaga() {
  yield all([countWatcher(), countryWatcher(), getUserWatcher()]);
}

export default rootSaga;
