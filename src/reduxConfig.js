import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./redux/reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "allInfo",
  storage: storage,
  whitelist: ["allInfo"], 
};
const pReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = createLogger();

const configureStore = (preloadedState) => {
  return persistStore(createStore(
    pReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  ));
}

export default configureStore;
