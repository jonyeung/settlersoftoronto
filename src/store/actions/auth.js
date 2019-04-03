import * as actionTypes from './actionTypes';
import * as lobbyActions from '../actions/lobby'
import axios from '../../axios-projects';

export const login = (idToken, idTokenExpiryDate, username, uid) => {
  return {
    type: actionTypes.LOGIN,
    idToken: idToken,
    idTokenExpiryDate: idTokenExpiryDate,
    username: username,
    uid: uid
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

export const authSignIn = (idToken, idTokenExpiryDate, username, uid) => {
  return (dispatch) => {
    console.log('auth sign in: ', idToken, idTokenExpiryDate, username, uid)
    dispatch(login(idToken, idTokenExpiryDate, username, uid))
    dispatch(lobbyActions.initRefreshRoom());
  }
}
export const authCheckState = (idToken, idTokenExpiryDate, username, uid) => {
  console.log('inside sign in action')
  return (dispatch) => {

    //if token did not expire, login
    if (idToken !== null) {
      dispatch(login(idToken, idTokenExpiryDate, username, uid))
      lobbyActions.initRefreshRoom();
    }
    // else logout
    else {
      authReset()
    }
  }
}
