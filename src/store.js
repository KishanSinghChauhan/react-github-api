import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleWare from "redux-thunk";
import { persistStore } from "redux-persist";

import rootReducer from './redux/rootReducer'

const logger = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleWare, logger)
);

const persistor = persistStore(store);

export {store , persistor};