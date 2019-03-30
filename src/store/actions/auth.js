import * as actionTypes from './actionTypes';
import * as lobbyActions from '../actions/lobby'
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

export const authReset = () => {
  return (dispatch) => {
    dispatch(logout())
  }
}

export const authSignIn = (idToken, idTokenExpiryDate, username) => {
  return (dispatch) => {
    dispatch(login(idToken, idTokenExpiryDate, username))
    dispatch(lobbyActions.initRefreshRoom());
  }
}
export const authCheckState = (idToken, idTokenExpiryDate, username) => {
  console.log('inside sign in action')
  return (dispatch) => {

    //if token did not expire, login
    if (idToken !== null) {
      dispatch(login(idToken, idTokenExpiryDate, username))
      lobbyActions.initRefreshRoom();
    }
    // else logout
    else {
      authReset()
    }
  }
}
