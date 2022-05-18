import {put,takeLatest} from "redux-saga/effects"
import {useSelector} from "react-redux"
import {putTestValue,tryGetValue} from "../redux/slice/countTest"

const delay=(ms)=>new Promise(res=>setTimeout(res, ms))

function * putCountWorker(){
yield delay(500)
  console.log("heeelllloeon")
 yield put(putTestValue("hellllooooo"))
}
export function * countWatcher(){
yield takeLatest(tryGetValue,putCountWorker)
}

