import {countWatcher,countryWatcher} from "./countrySaga";
import {all} from "redux-saga/effects"

function * rootSaga(){
  yield all([
    countWatcher(),
    countryWatcher(),
    ]

  )
}
export default rootSaga
