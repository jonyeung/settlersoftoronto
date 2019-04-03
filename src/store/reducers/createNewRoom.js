import * as actionTypes from '../actions/actionTypes';

const initialState = {
  errorMessage: '',
  error: null, //null means untouched
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_NEW_ROOM:
      return {
        ...state,
        errorMessage: '',
        error: false,
        loading: false,
      }
    case actionTypes.CREATE_NEW_ROOM_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage,
        error: true,
        loading: false
      }
    case actionTypes.CREATE_NEW_ROOM_RESET:
      return {
        ...initialState
      }
    case actionTypes.CREATE_NEW_ROOM_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}

export default reducer;