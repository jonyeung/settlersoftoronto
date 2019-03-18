import * as actionTypes from '../actions/actionTypes';

const initialState = {
  selectedEdgeId: null,
  selectedCornerId: null,

  gameName: null,
  username: 'david',
  error: false
}

const reducer = (state = initialState, action) => {
  // console.log('reducer', state)
  switch (action.type) {
    case actionTypes.SELECT_EDGE:
      return {
        ...state,
        selectedEdgeId: action.selectedEdgeId,
        error: false
      }
    case actionTypes.UNSELECT_EDGE:
      return {
        ...state,
        selectedEdgeId: action.selectedEdgeId,
        error: false
      }
    case actionTypes.SELECT_CORNER:
      return {
        ...state,
        selectedCornerId: action.selectedCornerId,
        error: false
      }
    case actionTypes.UNSELECT_CORNER:
      return {
        ...state,
        selectedCornerId: action.selectedCornerId,
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