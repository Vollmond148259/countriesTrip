import {put,takeLatest,call} from "redux-saga/effects"
//import {useSelector} from "react-redux"
import fetchArray from "./api"
import {dataLoading, putTestValue, putTestCollection,tryGetValue} from "../redux/slice/countTest"

const delay=(ms)=>new Promise(res=>setTimeout(res, ms))
///worker
function * putCountWorker(){
yield delay(500)
  console.log("heeelllloeon")
 yield put(putTestValue("hellllooooo"))
}
export function * countWatcher(){
yield takeLatest(tryGetValue,putCountWorker)
}
///watcher
///worker
function * tryGetCountries(){
  try{
    const response=yield call(fetchArray)
    const result=response.data
    yield put(putTestCollection(result))
  }
  catch{
    console.log("error")
  }
}
export function * countryWatcher(){
  yield takeLatest(dataLoading,tryGetCountries)
}


