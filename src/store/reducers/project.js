import * as actionTypes from '../actions/actionTypes';

const initialState = {
  project: {},
  error: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PROJECT:
      return {
        ...state,
        project: action.project,
        error: false
      }
    case actionTypes.FETCH_PROJECT_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default reducer;