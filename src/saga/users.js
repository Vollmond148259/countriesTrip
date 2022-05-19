import {call, put, takeLatest} from "redux-saga/effects"
import {putUsersSuccess, userLoading} from "../redux/slice/userTest";
import {fetchUsers} from "../saga/api"

function* getUserWorker() {
  const response = yield call(fetchUsers)
  const userArray = response.data
  yield put(putUsersSuccess(userArray))
}

export function* getUserWatcher() {
  yield takeLatest(userLoading, getUserWorker)
}
