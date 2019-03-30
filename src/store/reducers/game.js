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
    case actionTypes.UPDATE_GAME_STATE:
      return {
        ...state,
        ...action.newGameState,
        error: false
      }
    case actionTypes.ROOM_SETUP:
      return {
        ...state,
        error: false
      }
    case actionTypes.PLAYER_JOIN:
      return {
        ...state,
        error: false
      }
    case actionTypes.START_GAME:
      return {
        ...state,
        error: false
      }
    case actionTypes.BEGIN_MAIN_GAME:
      return {
        ...state,
        error: false
      }
    case actionTypes.SEVEN_ROLL:
      return {
        ...state,
        error: false
      }
    case actionTypes.MOVE_ROBBER:
      return {
        ...state,
        error: false
      }
    case actionTypes.BUILD_STARTING_ROAD:
      return {
        ...state,
        error: false
      }
    case actionTypes.BUILD_ROAD:
      return {
        ...state,
        error: false
      }
    case actionTypes.BUILD_STARTING_SETTLEMENT:
      return {
        ...state,
        error: false
      }
    case actionTypes.BUILD_SETTLEMENT:
      return {
        ...state,
        error: false
      }
    case actionTypes.BUILD_CITY:
      return {
        ...state,
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