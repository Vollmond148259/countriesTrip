import {takeEvery } from "redux-saga/effects";

import {removeFavoriteCities} from "../redux/slice/slice"

///worker
function* tryRerenderFavoriteCities() {
  try {
console.log("")
  } catch {
    console.log("error");
  }
}
export function* countryRemoveWatcher() {
  yield takeEvery(removeFavoriteCities, tryRerenderFavoriteCities);
}
