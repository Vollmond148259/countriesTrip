import {countWatcher} from "./countrySaga";
import {all} from "redux-saga/effects"

function * rootSaga(){
  yield all([
    countWatcher(),
    ]

  )
}
export default rootSaga
