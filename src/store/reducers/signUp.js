import * as actionTypes from '../actions/actionTypes';

const initialState = {
  errorMessage: '',
  error: null, //null means untouched
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP:
      return {
        ...state,
        errorMessage: '',
        error: false,
        loading: false
      }
    case actionTypes.SIGN_UP_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage,
        error: true,
        loading: false
      }
    case actionTypes.SIGN_UP_RESET:
      return {
        ...initialState
      }
    case actionTypes.SIGN_UP_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}

export default reducer;