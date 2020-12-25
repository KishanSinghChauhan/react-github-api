import {
  CHANGE_USER,
  REQUEST_INFO_PENDING,
  REQUEST_INFO_SUCCESS,
  REQUEST_INFO_FAILED,
  REQUEST_REPO_PENDING,
  REQUEST_REPO_SUCCESS,
  REQUEST_REPO_FAILED,
} from "./contants";

export const selectUser = (text) => {
  return {
    type: CHANGE_USER,
    payload: text,
  };
}


export const requestUserInfo = (user) => (dispatch) => {
  dispatch({ type: REQUEST_INFO_PENDING });
  fetch(`https://api.github.com/users/${user}`)
    .then((res) => res.json())
    .then((data) => dispatch({ type: REQUEST_INFO_SUCCESS, payload: data }))
    .catch((error) => dispatch({ type: REQUEST_INFO_FAILED, payload: error }));
};

export const requestUserRepo = (user) => (dispatch) => {
  dispatch({ type: REQUEST_REPO_PENDING });
  fetch(`https://api.github.com/users/${user}/repos`)
    .then((res) => res.json())
    .then((data) => dispatch({ type: REQUEST_REPO_SUCCESS, payload: data }))
    .catch((error) => dispatch({ type: REQUEST_REPO_FAILED, payload: error }));
};

