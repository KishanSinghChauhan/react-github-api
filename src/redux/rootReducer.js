import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import { setUser, requestUserInfo, requestUserRepo } from "./reducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["requestUserInfo"],
};

const rootReducer = combineReducers({
  setUser,
  requestUserInfo,
  requestUserRepo
});

export default persistReducer(persistConfig, rootReducer);