import * as actionTypes from '../actions/actionTypes';

const initialState = {
  joinedRoom: null,
  error: false
}

const reducer = (state = initialState, action) => {
  console.log('join room reducer')
  console.log('action: ', action)
  switch (action.type) {
    case actionTypes.JOIN_ROOM:
      return {
        ...state,
        joinedRoom: action.joinedRoom,
        error: false
      }
    case actionTypes.LEAVE_ROOM:
      return {
        ...state,
        joinedRoom: null,
        error: false
      }
    case actionTypes.ROOM_ACTION_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default reducer;