import * as actionTypes from '../actions/actionTypes';

const initialState = {
  selectedEdgeId: null,
  selectedCornerId: null,

  gameName: null,
  players: [],
  hexes: [],
  roads: [],
  settlements: [],
  cities: [],
  currentLargestArmy: 0,
  currentLongestRoad: 0,
  currentPlayerNum: 0,
  maxPlayerNum: 0,
  currentTurn: null,
  turnPhase: 'game not started',
  gameOver: false,
  winner: null,
  _id: null,

  error: null
}

const reducer = (state = initialState, action) => {
  // console.log('reducer', state)
  switch (action.type) {
    case actionTypes.SELECT_EDGE:
      return {
        ...state,
        selectedEdgeId: action.selectedEdgeId,
        error: null
      }
    case actionTypes.UNSELECT_EDGE:
      return {
        ...state,
        selectedEdgeId: action.selectedEdgeId,
        error: null
      }
    case actionTypes.SELECT_CORNER:
      return {
        ...state,
        selectedCornerId: action.selectedCornerId,
        error: null
      }
    case actionTypes.UNSELECT_CORNER:
      return {
        ...state,
        selectedCornerId: action.selectedCornerId,
        error: null
      }
    case actionTypes.UPDATE_GAME_STATE:
      return {
        ...state,
        ...action.newGameState,
        error: null
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