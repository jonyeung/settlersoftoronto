import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const login = (idToken, idTokenExpiryDate, username) => {
  return {
    type: actionTypes.LOGIN,
    idToken: idToken,
    idTokenExpiryDate: idTokenExpiryDate,
    username: username
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  }
}

export const authCheckState = (idToken, idTokenExpiryDate, username) => {
  console.log('inside sign in action')
  return (dispatch) => {

    //if token did not expire, login
    if (idToken !== null) {
      dispatch(login(idToken, idTokenExpiryDate, username))
    }
    // else logout
    else {
      dispatch({
        type: actionTypes.LOGOUT,
      })
    }
  }
}
