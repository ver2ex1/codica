import { promiseReducer } from "./promiseReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const store = createStore(promiseReducer, applyMiddleware(thunk));
