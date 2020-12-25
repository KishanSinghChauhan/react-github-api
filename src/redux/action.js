import {
  SELECT_USER,
  REQUEST_USERDATA,
  RECEIVE_USERDATA,
  RECEIVE_USERDATA_ERROR,
  REQUEST_REPOS,
  RECEIVE_REPOS,
  RECEIVE_REPOS_ERROR,
} from "./contants";

export const selectUser = (user) => {
  return {
    type: SELECT_USER,
    user,
  };
}

export const requestUserData = () =>  {
  return {
    type: REQUEST_USERDATA,
  };
}

const receiveUserData = (json) => {
  return {
    type: RECEIVE_USERDATA,
    userData: json,
  };
}

const receiveUserDataErr = (error) => {
  return {
    type: RECEIVE_USERDATA_ERROR,
    error,
  };
}

const requestRepos = () => {
  return {
    type: REQUEST_REPOS,
  };
}

const receiveRepos = (json) => {
  return {
    type: RECEIVE_REPOS,
    repos: json,
  };
}

const receiveReposErr = (error) => {
  return {
    type: RECEIVE_REPOS_ERROR,
    error,
  };
}

export const fetchUserData = (user) => {
  return (dispatch) => {
    dispatch(requestUserData());
    return fetch(`https://api.github.com/users/${user}`)
      .then((res) => res.json())
      .then((json) => dispatch(receiveUserData(json)))
      .catch((err) => dispatch(receiveUserDataErr(err)));
  };
}

const fetchRepos = (user) => {
  return (dispatch) => {
    dispatch(requestRepos());
    return fetch(`https://api.github.com/users/${user}/repos`)
      .then((res) => res.json())
      .then((json) => dispatch(receiveRepos(json)))
      .catch((err) => dispatch(receiveReposErr(err)));
  };
}

export const fetchUserAndRepos = (user) => {
  return (dispatch, getState) => {
    return dispatch(fetchUserData(user)).then(() => {
      const { currentUserData } = getState();
      if (!currentUserData.isFetching && currentUserData.userData.message) {
        return;
      }
      return dispatch(fetchRepos(user));
    });
  };
}
