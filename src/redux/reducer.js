import {
  CHANGE_USER,
  REQUEST_INFO_PENDING,
  REQUEST_INFO_SUCCESS,
  REQUEST_INFO_FAILED,
  REQUEST_REPO_PENDING,
  REQUEST_REPO_SUCCESS,
  REQUEST_REPO_FAILED,
} from "./contants";

const initialState = {
  currentUser: "",
};
export const setUser = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_USER:
      return Object.assign({}, state, { currentUser: action.payload });
    default:
      return state;
  }
};

const initialStateUserInfo = {
  userData: [],
  isPending: true,
  error: "",
};

export const requestUserInfo = (state = initialStateUserInfo, action = {}) => {
  switch (action.type) {
    case REQUEST_INFO_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_INFO_SUCCESS:
      return Object.assign({}, state, {
        userData: action.payload,
        isPending: false,
      });
    case REQUEST_INFO_FAILED:
      return {
        ...state,
        userData:[...state.userData , { data: action.payload}]
      };
    default:
      return state;
  }
};

const initialStateUserRepo = {
  userRepo: [],
  isPending: true,
  error: "",
};

export const requestUserRepo = (state = initialStateUserRepo, action = {}) => {
  switch (action.type) {
    case REQUEST_REPO_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_REPO_SUCCESS:
      return Object.assign({}, state, {
        userRepo: action.payload,
        isPending: false,
      });
    case REQUEST_REPO_FAILED:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
};
