
import { mainReducer } from "./reducers";
import  { createStore } from 'redux'

export const store = createStore(mainReducer);