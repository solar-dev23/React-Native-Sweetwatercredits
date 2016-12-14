import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  LOGIN_UPDATE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER } from './types';

export const loginUpdate = ({ prop, value }) => {
  return {
    type: LOGIN_UPDATE,
    payload: { prop, value }
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
    });
  };
};

// Helper Methods Below vvvvvv
// Deal with dispatching login_user_success
const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
   });

   Actions.projects();
};

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};
