import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';
import * as lobbyActions from '../actions/lobby';


export const createNewRoom = (roomName) => {
  return {
    type: actionTypes.CREATE_NEW_ROOM,
    roomName: roomName
  }
}

export const createNewRoomFailed = (errorMessage) => {
  return {
    type: actionTypes.CREATE_NEW_ROOM_FAILED,
    errorMessage: errorMessage
  }
}

export const createNewRoomReset = () => {
  console.log('inside createNewRoomReset action')
  return (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_NEW_ROOM_RESET,
    })
  }
}

export const loading = (loading) => {
  return {
    type: actionTypes.CREATE_NEW_ROOM_LOADING,
    loading: loading
  }
}

// export const initSignIn = (email, password) => {

//   return (dispatch) => {
//     dispatch(loading(true));
//     axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDIuViSw1eLVB8zKgTdPHVmwm9O1xDFLFQ', {
//       email: email,
//       password: password,
//       returnSecureToken: true
//     })
//       .then((res) => {
//         console.log(res)
//         let authData = res.data
//         axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyDIuViSw1eLVB8zKgTdPHVmwm9O1xDFLFQ', {
//           idToken: res.data.idToken
//         })
//           .then((res) => {
//             console.log('getting user data')
//             console.log(res)
//             if (res.data.users[0].emailVerified === false) {
//               let e = Error('Email not verified');
//               e.name = 'UNVERIFIED_EMAIL';
//               throw e;
//             }
//             dispatch(signIn(authData))
//           })
//           .catch((error) => {
//             console.log('get user data error')
//             console.log(error)
//             console.log(error.message)
//             try {
//               dispatch(signInFailed(error.response.data.error.message));
//             } catch {
//               dispatch(signInFailed(error.message));
//             }
//           });
//       })
//       .catch((error) => {
//         console.log(error)
//         console.log(error.response)
//         dispatch(signInFailed(error.response.data.error.message));
//       });
//   }
// }

export const initCreateNewRoom = (roomName) => {

  return (dispatch) => {
    dispatch(loading(true));

    axios.post('http://localhost:3000/createNewRoom', {
    //axios.post('https://c09-project-express-backend.herokuapp.com/signIn', {

      roomName: roomName
    })
      .then((res) => {
        if (!res.data.error) {
          dispatch(createNewRoom(res.data))
          dispatch(lobbyActions.initRefreshRoom())
        } else {
          dispatch(createNewRoomFailed(res.data.error));
        }


      })
      .catch((error) => {
        console.log('error: ', error)
        dispatch(createNewRoom(error));
      });
  }
}