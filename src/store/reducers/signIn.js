import * as actionTypes from '../actions/actionTypes';

const initialState = {
  errorMessage: '',
  error: null, //null means untouched
  loading: false
}

const reducer = (state = initialState, action) => {
  // console.log('sign in reducer')
  // console.log(action)
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return {
        ...state,
        errorMessage: '',
        error: false,
        loading: false,
      }
    case actionTypes.SIGN_IN_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage,
        error: true,
        loading: false
      }
    case actionTypes.SIGN_IN_RESET:
      return {
        ...initialState
      }
    case actionTypes.SIGN_IN_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}

export default reducer;