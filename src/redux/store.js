import {configureStore} from "@reduxjs/toolkit";
import reducer from "../redux/rootReducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});
store.sagaTask = sagaMiddleware.run(rootSaga);
export default store;


