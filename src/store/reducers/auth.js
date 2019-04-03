import * as actionTypes from '../actions/actionTypes';

const initialState = {
  signedIn: false,
  idToken: null,
  idTokenExpiryDate: null,
  username: null,
  uid: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        signedIn: true,
        idToken: action.idToken,
        idTokenExpiryDate: action.idTokenExpiryDate,
        username: action.username,
        uid: action.uid
      }
    case actionTypes.LOGOUT:
      return {
        ...initialState,
      }
    default:
      return state;
  }
}

export default reducer;