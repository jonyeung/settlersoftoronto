import * as actionTypes from '../actions/actionTypes';

const initialState = {
  signedIn: false,
  idToken: null,
  idTokenExpiryDate: null,
  isAdmin: false
}

const reducer = (state = initialState, action) => {
  console.log('auth Reducer', state)
  console.log('auth Reducer action', action.type)

  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        signedIn: true,
        idToken: action.idToken,
        idTokenExpiryDate: action.idTokenExpiryDate,
        isAdmin: action.isAdmin
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