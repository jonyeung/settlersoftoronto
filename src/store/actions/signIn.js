import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const signIn = (authData) => {
  return {
    type: actionTypes.SIGN_IN,
    authData: authData
  }
}

export const signInFailed = (errorMessage) => {
  return {
    type: actionTypes.SIGN_IN_FAILED,
    errorMessage: errorMessage
  }
}

export const signInReset = () => {
  console.log('inside sign in action')
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGN_IN_RESET,
    })
  }
}

export const loading = (loading) => {
  return {
    type: actionTypes.SIGN_IN_LOADING,
    loading: loading
  }
}

export const initSignIn = (email, password) => {

  return (dispatch) => {
    dispatch(loading(true));
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDIuViSw1eLVB8zKgTdPHVmwm9O1xDFLFQ', {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .then((res) => {
        console.log(res)
        let authData = res.data
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyDIuViSw1eLVB8zKgTdPHVmwm9O1xDFLFQ', {
          idToken: res.data.idToken
        })
          .then((res) => {
            console.log('getting user data')
            console.log(res)
            if (res.data.users[0].emailVerified === false) {
              let e = Error('Email not verified');
              e.name = 'UNVERIFIED_EMAIL';
              throw e;
            }
            dispatch(signIn(authData))
          })
          .catch((error) => {
            console.log('get user data error')
            console.log(error)
            console.log(error.message)
            try {
              dispatch(signInFailed(error.response.data.error.message));
            } catch {
              dispatch(signInFailed(error.message));
            }
          });
      })
      .catch((error) => {
        console.log(error)
        console.log(error.response)
        dispatch(signInFailed(error.response.data.error.message));
      });
  }
}