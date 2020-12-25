import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import {createStore,applyMiddleware,combineReducers} from 'redux'
import {setUser,requestUserInfo,requestUserRepo} from './redux/reducer';
import {createLogger} from 'redux-logger';
import thunkMiddleWare from 'redux-thunk'

const rootReducer = combineReducers({setUser,requestUserInfo,requestUserRepo})
const logger = createLogger();
const store = createStore(rootReducer,applyMiddleware(thunkMiddleWare ,logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
