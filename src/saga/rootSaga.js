import {countryRemoveWatcher} from "./countrySaga";
import {all} from "redux-saga/effects";

function* rootSaga() {
  yield all([ countryRemoveWatcher()]);
}

export default rootSaga;
