import * as actionTypes from '../actions/actionTypes';

const initialState = {
  selectedEdgeId: null,
  selectedCornerId: null,
  error: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_EDGE:
      return {
        ...state,
        selectedId: action.selectedEdgeId,
        error: false
      }
    case actionTypes.UNSELECT_EDGE:
      return {
        ...state,
        selectedId: action.selectedEdgeId,
        error: false
      }
    case actionTypes.SELECT_CORNER:
      return {
        ...state,
        selectedId: action.selectedCornerId,
        error: false
      }
    case actionTypes.UNSELECT_CORNER:
      return {
        ...state,
        selectedId: action.selectedCornerId,
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