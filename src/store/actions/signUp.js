import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const signUp = () => {
  return {
    type: actionTypes.SIGN_UP,
  }
}

export const signUpFailed = (errorMessage) => {
  return {
    type: actionTypes.SIGN_UP_FAILED,
    errorMessage: errorMessage
  }
}

export const signUpReset = () => {
  console.log('inside sign up reducer')
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGN_UP_RESET,
    })
  }
}

export const loading = (loading) => {
  return {
    type: actionTypes.SIGN_UP_LOADING,
    loading: loading
  }
}

// export const initSignUp = (email, password) => {

//   return (dispatch) => {
//     dispatch(loading(true));
//     axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDIuViSw1eLVB8zKgTdPHVmwm9O1xDFLFQ', {
//       email: email,
//       password: password,
//       returnSecureToken: true
//     })
//       .then((res) => {
//         //send email confirmation
//         axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=AIzaSyDIuViSw1eLVB8zKgTdPHVmwm9O1xDFLFQ', {
//           requestType: 'VERIFY_EMAIL',
//           idToken: res.data.idToken
//         })
//           .then((res) => {
//             dispatch(signUp());
//           })
//       })
//       .catch((error) => {
//         dispatch(signUpFailed(error.response.data.error.message));
//       });
//   }
// }

export const initSignUp = (email, password) => {

  return (dispatch) => {
    dispatch(loading(true));
    
    // axios.post('http://localhost:3000/signUp', {
    axios.post('https://c09-project-express-backend.herokuapp.com/signUp', {
      email: email,
      password: password,
    })
      .then((res) => {
        if (!res.data.error) {
          console.log('res', res.data)
          dispatch(signUp())
        } else {
          console.log('sign up error: ', res.data.error)
          dispatch(signUpFailed(res.data.error));
        }

      })
      .catch((error) => {
        console.log('sign up error: ', error.data.error)
        dispatch(signUpFailed(error.data.error));
      });
  }
}